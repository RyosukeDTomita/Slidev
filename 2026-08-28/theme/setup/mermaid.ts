/**
 * Mermaidの既定配色は白背景前提で、このテーマの深い海の背景だと線も文字も沈む。
 * `base`テーマを土台に、styles/index.cssと同じ配色を渡して揃えている。
 * setupからはCSS変数を参照できないので、色は値を直書きする必要がある。
 *
 * shiki.tsと同様、`defineMermaidSetup`はimportしない。pnpmの厳密な
 * node_modulesだと`@slidev/types`が解決できないため(vite.config.ts参照)。
 */
export default function () {
  return {
    theme: 'base',

    /*
     * ラベル幅の計測にはthemeVariablesではなくトップレベルのfontSize/fontFamilyが使われる。
     *
     * htmlLabelsをfalseにしているのは、trueだとJetBrains Monoの読み込み前に
     * 確定した幅でforeignObjectが作られ、あとから実フォントで描かれた文字が
     * その幅で切られてしまうため(findUser -> findUs のように末尾が欠ける)。
     * SVGのtext描画なら実際に描いたものをgetBBoxで測るのでズレない。
     */
    fontSize: 24,
    fontFamily: '"JetBrains Mono", "Zen Kaku Gothic New", monospace',
    htmlLabels: false,
    flowchart: {
      htmlLabels: false,
      padding: 20, // cylinder等、角丸で内側が狭くなる図形でも文字が壁に触れない幅
      nodeSpacing: 40,
      rankSpacing: 44, // 段が増えても横に収まるように詰めてある
      /*
       * 既定(true)はSVGを容器幅に収めるので、幅の広い図だとfontSizeで指定した
       * 24pxが勝手に縮む。実寸で描かせ、拡大はスライド側の`scale`で行う。
       */
      useMaxWidth: false,
    },

    themeVariables: {
      background: '#001019', // --tg-abyss
      mainBkg: '#073642', // --tg-shallow: ノードの塗り
      primaryColor: '#073642',
      primaryTextColor: '#dbe8e6', // --tg-text
      primaryBorderColor: '#3fd0c4', // --tg-cyan
      nodeBorder: '#3fd0c4',
      nodeTextColor: '#dbe8e6',
      textColor: '#dbe8e6',
      lineColor: '#93a8ab', // --tg-muted: 矢印
      edgeLabelBackground: '#001019',

      // subgraph(層の枠)は本文より一段沈めて、ノードを前に出す
      clusterBkg: '#002b36', // --tg-deep
      clusterBorder: '#0e4a58', // --tg-line
      titleColor: '#f5c542', // --tg-gold: 層の名前

      fontFamily: '"JetBrains Mono", "Zen Kaku Gothic New", monospace',
      fontSize: '24px', // 投影で読める下限。スライド側でscaleを下げないこと
    },
  }
}
