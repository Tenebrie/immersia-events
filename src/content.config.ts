import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    titleFi: z.string(),
    titleEn: z.string(),
    dateFi: z.string(),
    dateEn: z.string(),
    venue: z.string(),
    urlFi: z.string(),
    urlEn: z.string(),
    dressCodeFi: z.string().optional(),
    dressCodeEn: z.string().optional(),
    ticketUrl: z.url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { events };
