/**
 * コードハイライトは Solarized をそのまま使う。
 * ただし solarized-dark のコメント色 (#586E75) は投影だと沈むので、
 * styles/index.css 側で一段明るく上書きしている。
 */
export default function () {
  return {
    themes: {
      dark: 'solarized-dark',
      light: 'solarized-light',
    },
  }
}
