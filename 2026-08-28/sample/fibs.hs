{-# OPTIONS_GHC -Wno-x-partial #-}
module Main (main) where

-- 遅延評価を使った実装
fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)

main :: IO ()
main = do
  print $ fibs !! 4
