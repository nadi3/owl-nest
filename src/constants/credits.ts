import type { Credit } from '@/types/credits';

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
