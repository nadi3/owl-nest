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
    id: 'audio-visualizer',
    titleKey: 'tools.audio-visualizer.title',
    subtitleKey: 'tools.audio-visualizer.subtitle',
    descriptionKey: 'tools.audio-visualizer.description',
    path: '/tools/visualizer',
  },
];
