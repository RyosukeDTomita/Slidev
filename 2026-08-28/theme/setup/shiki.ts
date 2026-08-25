/**
 * コードハイライトはSolarizedをそのまま使う。
 * ただしsolarized-darkは投影だと沈む色が多いので、styles/index.css側で
 * トークンごとに上書きしている(本文 / コメント / 型 / 関数 / キーワード /
 * データ構築子 / 数値、および斜体・太字)。詳細はtheme/README.mdを参照。
 */
export default function () {
  return {
    themes: {
      dark: 'solarized-dark',
      light: 'solarized-light',
    },
  }
}
