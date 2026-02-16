import { z } from 'astro:content';

export const workSchema = z.object({
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
    isShort: z.boolean().default(false),
    images: z.array(
        z.union([
            z.string(), // 画像パスのみ
            z.object({
                src: z.string(), // 画像パス
                caption: z.string().optional(), // キャプション（任意）
            }),
        ])
    ).optional(), // SS用画像リスト
});

export type Work = z.infer<typeof workSchema>;
