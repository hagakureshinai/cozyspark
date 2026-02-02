import { defineCollection, z } from 'astro:content';

const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    workTitle: z.string(),       // 作品名
    title: z.string(),           // エピソード名
    description: z.string(),     // あらすじ・説明
    pubDate: z.date(),           // 公開日（2026-01-30 形式）
    workId: z.string(),          // 作品識別ID
    order: z.number(),           // 並び順（数字）
    rating: z.enum(['all', 'R15', 'R18']), // 年齢制限
  }),
});

export const collections = {
  'works': worksCollection,
};