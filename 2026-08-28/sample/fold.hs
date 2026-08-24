module Main (main) where

mySum :: [Int] -> Int
mySum xs = foldr (+) 0 xs

myProduct :: [Int] -> Int
myProduct xs = foldr (*) 1 xs

insertSort :: [Int] -> [Int]
insertSort xs = foldr insert [] xs
  where
    insert y [] = [y]
    insert y (z : zs)
      | y <= z = y : z : zs
      | otherwise = z : insert y zs

main :: IO ()
main = do
  print $ mySum [1, 2, 3]
  print $ myProduct [1, 2, 3]
  print $ insertSort [3, 2, 1]
