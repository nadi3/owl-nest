import type { UselessWidget } from '@/types/useless';

export const USELESS_WIDGETS: UselessWidget[] = [
  {
    id: 'fleeing-mouse',
    titleKey: 'useless.items.fleeing-mouse.title',
    subtitleKey: 'useless.items.fleeing-mouse.subtitle',
    descriptionKey: 'useless.items.fleeing-mouse.description',
    path: '/useless/fleeing',
  },
  {
    id: 'infinite-button',
    titleKey: 'useless.items.infinite-button.title',
    subtitleKey: 'useless.items.infinite-button.subtitle',
    descriptionKey: 'useless.items.infinite-button.description',
    path: '/useless/infinite',
    disabled: true,
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
