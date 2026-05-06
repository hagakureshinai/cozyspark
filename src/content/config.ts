import { defineCollection } from 'astro:content';
import { workSchema } from './schemas/works';
import { episodeSchema } from './schemas/episodes';

// 菴懷刀・・orks・峨・螳夂ｾｩ
const worksCollection = defineCollection({
  type: 'content',
  schema: workSchema,
});

// 蜷・ｩｱ・・pisodes・峨・螳夂ｾｩ
const episodesCollection = defineCollection({
  type: 'content',
  schema: episodeSchema,
});

// Astro縺ｫ縺薙ｌ繧峨ｒ菴ｿ縺・％縺ｨ繧剃ｼ昴∴繧・
export const collections = {
  'works': worksCollection,
  'episodes': episodesCollection,
};
