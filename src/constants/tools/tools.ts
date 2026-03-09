import type { PublicTool } from '@/types/tools/tools.ts';

export const PUBLIC_TOOLS: PublicTool[] = [
  {
    id: 'destiny-wheel',
    titleKey: 'tools.items.destiny-wheel.title',
    subtitleKey: 'tools.items.destiny-wheel.subtitle',
    descriptionKey: 'tools.items.destiny-wheel.description',
    path: '/tools/wheel',
  },
  {
    id: 'audioVisualizer',
    titleKey: 'tools.audioVisualizer.title',
    subtitleKey: 'tools.audioVisualizer.subtitle',
    descriptionKey: 'tools.audioVisualizer.description',
    path: '/tools/visualizer',
  },
  {
    id: 'anonymizer',
    titleKey: 'tools.anonymizer.title',
    subtitleKey: 'tools.anonymizer.subtitle',
    descriptionKey: 'tools.anonymizer.description',
    path: '/tools/anonymizer',
  },
];
