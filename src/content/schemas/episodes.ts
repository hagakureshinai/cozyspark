import { z } from 'astro:content';

export const episodeSchema = z.object({
    workId: z.string(),   // 所属する作品のID（ファイル名と一致させる）
    title: z.string(),    // エピソードのタイトル
    order: z.number(),    // 話数（並び順）
    pubDate: z.date().optional(), // 公開日（任意）
    description: z.string().optional(), // 各話のあらすじ（任意）
    wordCount: z.string().optional(), // 例: "2,500字"
});

export type Episode = z.infer<typeof episodeSchema>;
