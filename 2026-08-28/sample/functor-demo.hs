{-# OPTIONS_GHC -Wunused-imports #-}

--   実行: runghc monad-slide-demo.hs
module Main (main) where

import Data.List (find)

--------------------------------------------------------------------------------
-- リポジトリ層
--------------------------------------------------------------------------------

type UserId = Int

data User = User
  { userId :: UserId,
    userName :: String
  }
  deriving (Show, Eq)

data UserError
  = NotFound UserId
  | DbDown String
  deriving (Show, Eq)

-- | DBの代わり。
users :: [User]
users =
  [ User 1 "sigma",
    User 2 "netadashi"
  ]

-- | 模擬DBからUserIdをもとにユーザ名を取得
findUser :: UserId -> Either UserError User
findUser uid
  | uid < 0 = Left $ DbDown "connection refused" -- 負のuserIdでDB障害をシミュレート
  | otherwise = case find (\u -> userId u == uid) users of
      Just u -> Right u
      Nothing -> Left $ NotFound uid

--------------------------------------------------------------------------------
-- ドメイン層
--------------------------------------------------------------------------------

name :: User -> String
name u = userName u

greet :: String -> String
greet n = "Hello, " ++ n ++ "!"

--------------------------------------------------------------------------------
-- ドメイン層 -> アプリケーション層: try-catchは1つもない
--------------------------------------------------------------------------------

-- | Functor版。失敗しない関数(name / greet)だけならfmapで足りる。
greetingF :: UserId -> Either UserError String
greetingF uid = fmap greet (fmap name (findUser uid))

--------------------------------------------------------------------------------
-- アプリケーション層: ここで初めてLeft/Rightを開く
--------------------------------------------------------------------------------

data Response = Response
  { statusCode :: Int,
    body :: String
  }
  deriving (Show, Eq)

ok :: Int -> String -> Response
ok code msg = Response code msg

err :: Int -> String -> Response
err code msg = Response code msg

-- | Eitherを開いてレスポンスを決定
handle :: UserId -> Response
handle uid = case greetingF uid of
  Right msg -> ok 200 msg
  Left (NotFound _) -> err 404 "user not found"
  Left (DbDown detail) -> err 500 detail

--------------------------------------------------------------------------------

-- | 成功 / 未検出 / DB障害の3パターン
sampleIds :: [UserId]
sampleIds = [1, 2, 42, -99]

main :: IO ()
main = do
  putStrLn "== コントローラー: ここで初めてLeft/Rightを開く =="
  mapM_ (\uid -> print $ handle uid) sampleIds
