import { defineCollection } from 'astro:content';
import { workSchema } from './schemas/works';
import { episodeSchema } from './schemas/episodes';

// 作品（Works）の定義
const worksCollection = defineCollection({
  type: 'content',
  schema: workSchema,
});

// 各話（Episodes）の定義
const episodesCollection = defineCollection({
  type: 'content',
  schema: episodeSchema,
});

// Astroにこれらを使うことを伝える
export const collections = {
  'works': worksCollection,
  'episodes': episodesCollection,
};