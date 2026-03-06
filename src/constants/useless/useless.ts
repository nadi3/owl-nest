import type { UselessWidget } from '@/types/useless/useless.ts';

export const USELESS_WIDGETS: UselessWidget[] = [
  {
    id: 'fleeing-mouse',
    titleKey: 'useless.items.fleeing-mouse.title',
    subtitleKey: 'useless.items.fleeing-mouse.subtitle',
    descriptionKey: 'useless.items.fleeing-mouse.description',
    path: '/useless/fleeing',
  },
  {
    id: 'suffering',
    titleKey: 'useless.items.suffering.title',
    subtitleKey: 'useless.items.suffering.subtitle',
    descriptionKey: 'useless.items.suffering.description',
    path: '/useless/suffering',
  },
  {
    id: 'wait-button',
    titleKey: 'useless.items.wait-button.title',
    subtitleKey: 'useless.items.wait-button.subtitle',
    descriptionKey: 'useless.items.wait-button.description',
    path: '/useless/wait',
    disabled: true,
  },
];
