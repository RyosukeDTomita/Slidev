{
  description = "Slidev slides for study groups, published to GitHub Pages";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (pkgs: {
        # 通常の執筆/プレビュー用。`nix develop` -> `pnpm install` -> `pnpm dev`
        default = pkgs.mkShell {
          packages = [
            pkgs.nodejs_22
            pkgs.pnpm
            pkgs.git
          ];

          # playwright-chromium はブラウザ本体を nixpkgs 側から貰うので、
          # npm install 時のダウンロード(数百MB)は不要。CI の install もこれで軽くなる。
          env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";

          # `nix develop --command ...` の出力を汚さないよう、案内は stderr に出す。
          shellHook = ''
            {
              echo "Slidev dev shell (node $(node --version) / pnpm $(pnpm --version))"
              echo "  pnpm install           依存関係のインストール"
              echo "  pnpm dev 2026-08-28    スライドのプレビュー"
              echo "  pnpm build             全スライドを dist/ にビルド"
              echo "  nix develop .#export   PDF/PNG エクスポート用シェル"
            } >&2
          '';
        };

        # `slidev export` 用。Playwright のブラウザを nixpkgs 側から供給するため、
        # 起動時に Chromium 一式を取得する。普段使いには default で十分。
        export = pkgs.mkShell {
          packages = [
            pkgs.nodejs_22
            pkgs.pnpm
            pkgs.git
            pkgs.playwright-driver.browsers
          ];

          env = {
            PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}";
            PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";
            PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";
          };

          shellHook = ''
            {
              echo "Slidev export shell (node $(node --version))"
              echo "  pnpm export 2026-08-28   PDF を出力"
              echo "  pnpm og 2026-08-28       OGP 画像 (og-image.png) を出力"
            } >&2
          '';
        };
      });

      formatter = forAllSystems (pkgs: pkgs.nixfmt-tree);
    };
}
