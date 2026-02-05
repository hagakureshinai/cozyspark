import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// import sitemap from '@astrojs/sitemap'; // サイトマップの設定

export default defineConfig({
  // サイトのドメイン（末尾のスラッシュはなし）
  site: 'https://hagakureshinai.github.io',
  // リポジトリ名と同じにする（前後のスラッシュが必要）
  base: '/cozyspark',
  integrations: [sitemap()],

  markdown: {
    remarkPlugins: [
      // Nola/青空文庫形式のルビ変換プラグイン
      function nolaRubyPlugin() {
        return (tree) => {
          // Markdownの各要素を調べて回る関数
          function walk(node) {
            if (node.type === 'text') {
              
              const rubyRegex = /[｜|]([^｜|]+?)《(.+?)》|([々〇\u4e00-\u9fa5]+)《(.+?)》/g;
              
              // ルビ記法が含まれているかチェック
              if (rubyRegex.test(node.value)) {
                node.type = 'html';
                node.value = node.value.replace(rubyRegex, (match, p1, p2, p3, p4) => {
                  const kanji = p1 || p3;
                  const yomi = p2 || p4;
                  return `<ruby>${kanji}<rt>${yomi}</rt></ruby>`;
                });
              }
            }
            // 子要素があれば再帰的に調べる
            if (node.children) {
              node.children.forEach(walk);
            }
          }
          walk(tree);
        };
      },
    ],
  },
});