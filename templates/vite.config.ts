/// <reference types="@slidev/types" />

// スライドから参照しないディレクトリを watcher の対象外にする。
// 特に direnv / nix が作る .direnv は /nix/store への symlink を含み、
// watcher に辿らせると nixpkgs 全体を監視しようとして
// ENOSPC (file watchers 上限) で dev サーバが落ちる。
// vite を直接 import すると pnpm の厳密な node_modules で解決できないため、
// defineConfig は使わずプレーンオブジェクトを export する。
export default {
  server: {
    watch: {
      ignored: ['**/sample/**', '**/.direnv/**', '**/result', '**/result-*'],
    },
  },
}
