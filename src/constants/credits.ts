/**
 * @file credits.ts
 * @description This file contains the master list of all third-party assets,
 * libraries, and frameworks used in the Owl Nest application.
 * This data is used to populate the "Credits" page.
 */

import type { Credit } from '@/types/credits';

/**
 * An array of `Credit` objects, each representing a third-party resource
 * that requires attribution.
 *
 * Each object includes:
 * - `id`: A unique identifier for the credit.
 * - `name`: The official name of the library or asset.
 * - `category`: The category the resource belongs to.
 * - `license`: The license under which the resource is used.
 * - `url`: A direct link to the resource's official website.
 * - `descriptionKey`: A translation key for a more detailed description of how the resource is used.
 *
 * @constant
 * @type {Credit[]}
 */
export const CREDITS_DATA: Credit[] = [
  {
    id: 'storyset',
    name: 'Storyset',
    category: 'Illustrations',
    license: 'Free with attribution',
    url: 'https://storyset.com/',
    descriptionKey: 'credits.descriptions.storyset',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Core',
    license: 'MIT',
    url: 'https://react.dev/',
    descriptionKey: 'credits.descriptions.react',
  },
  {
    id: 'mui',
    name: 'Material UI',
    category: 'UI Framework',
    license: 'MIT',
    url: 'https://mui.com/',
    descriptionKey: 'credits.descriptions.mui',
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'Animation',
    license: 'MIT',
    url: 'https://www.framer.com/motion/',
    descriptionKey: 'credits.descriptions.framer-motion',
  },
  {
    id: 'lucide',
    name: 'Lucide React',
    category: 'Icons',
    license: 'ISC',
    url: 'https://lucide.dev/',
    descriptionKey: 'credits.descriptions.lucide',
  },
];
