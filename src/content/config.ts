import { defineCollection, z } from 'astro:content';

// 作品（Works）の定義
const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['series', 'single', 'ss']), // シリーズ, 単発, 掌編
    status: z.enum(['ongoing', 'completed']),   // 連載中, 完結
    order: z.number(),                            // 表示順
    // 必要に応じて今後追加（例：coverImageなど）
  }),
});

// 各話（Episodes）の定義
const episodesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    workId: z.string(),   // 所属する作品のID（ファイル名と一致させる）
    title: z.string(),    // エピソードのタイトル
    order: z.number(),    // 話数（並び順）
    pubDate: z.date().optional(), // 公開日（任意）
  }),
});

// Astroにこれらを使うことを伝える
export const collections = {
  'works': worksCollection,
  'episodes': episodesCollection,
};