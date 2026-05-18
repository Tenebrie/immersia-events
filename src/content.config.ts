import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    titleFi: z.string(),
    titleEn: z.string(),
    date: z.string(),
    venue: z.string(),
    dressCodeFi: z.string().optional(),
    dressCodeEn: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { events };
