module Main (main) where

-- 再帰版
fib :: Int -> Int
fib n
  | n == 0 = 0
  | n == 1 = 1
  | otherwise = fib (n - 1) + fib (n - 2)

main :: IO ()
main = print $ fib 4 -- 3
