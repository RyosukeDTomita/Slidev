{ pkgs, ... }:
{
  projectRootFile = "flake.nix";

  programs.nixfmt.enable = true;
  programs.nixfmt.package = pkgs.nixfmt-rfc-style;

  programs.ormolu.enable = true;
  programs.ormolu.package = pkgs.haskell.packages.ghc984.ormolu;
}
