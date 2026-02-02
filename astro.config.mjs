import { defineConfig } from 'astro/config';

export default defineConfig({
  // サイトのドメイン（末尾のスラッシュはなし）
  site: 'https://hagakureshinai.github.io',
  // リポジトリ名と同じにする（前後のスラッシュが必要）
  base: '/cozyspark',
});