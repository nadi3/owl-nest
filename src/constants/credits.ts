import type { Credit } from '@/types/credits';

export const CREDITS_DATA: Credit[] = [
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
    category: 'UI',
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
    category: 'UI',
    license: 'ISC',
    url: 'https://lucide.dev/',
    descriptionKey: 'credits.descriptions.lucide',
  },
  {
    id: 'traefik',
    name: 'Traefik',
    category: 'Infrastructure',
    license: 'Apache 2.0',
    url: 'https://traefik.io/',
    descriptionKey: 'credits.descriptions.traefik',
  },
];
