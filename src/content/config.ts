import { defineCollection, z } from 'astro:content';

// 作品（Works）の定義
const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),           // 一言あらすじ（任意）
    lastUpdated: z.date().optional(),              // 最終更新日（任意）
    category: z.enum(['series', 'single', 'ss']), // シリーズ, 単発, 掌編
    status: z.enum(['ongoing', 'completed']),   // 連載中, 完結
    order: z.number(),                            // 表示順
    isUpdated: z.boolean().optional(),            // 最新更新バッジ判定用（任意）
    externalLink: z.string().url().optional(), // 外部リンクURL
    isDraft: z.boolean().optional(),           // 工事中フラグ
    isR18: z.boolean().default(false), // R18かどうか（デフォルトはfalse）
    wordCount: z.string().optional(),  // 文字数（例: "約10,000字" や "1.5万字"）
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
    description: z.string().optional(), // 各話のあらすじ（任意）
  }),
});

// Astroにこれらを使うことを伝える
export const collections = {
  'works': worksCollection,
  'episodes': episodesCollection,
};