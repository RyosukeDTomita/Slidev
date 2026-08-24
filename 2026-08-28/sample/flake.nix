{
  description = "Haskell dev environment (ghc + ghc-vis + treefmt)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    { nixpkgs, treefmt-nix, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
      treefmtFor = pkgs: (treefmt-nix.lib.evalModule pkgs ./treefmt.nix).config.build.wrapper;
    in
    {
      formatter = forAllSystems treefmtFor;

      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          packages = [
            (treefmtFor pkgs)
            (pkgs.haskell.packages.ghc984.ghcWithPackages (ps: [ ps.ghc-vis ]))
          ];
        };
      });
    };
}
