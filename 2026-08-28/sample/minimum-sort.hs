{-# OPTIONS_GHC -Wno-x-partial #-}
module Main (main) where

import Data.List (sort)

-- | 遅延評価おもしろ実装 O(n)
minimum' :: (Ord a) => [a] -> a
minimum' xs = (head . sort) xs

main :: IO ()
main = print $ minimum' [3, 1, 2]
