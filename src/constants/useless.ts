import type { UselessWidget } from '@/types/useless';

export const USELESS_WIDGETS: UselessWidget[] = [
  {
    id: 'fleeing-button',
    titleKey: 'useless.items.fleeing-button.title',
    subtitleKey: 'useless.items.fleeing-button.subtitle',
    descriptionKey: 'useless.items.fleeing-button.description',
    icon: 'ban',
    path: '/useless/fleeing',
    disabled: true,
  },
  {
    id: 'infinite-button',
    titleKey: 'useless.items.infinite-button.title',
    subtitleKey: 'useless.items.infinite-button.subtitle',
    descriptionKey: 'useless.items.infinite-button.description',
    icon: 'zap',
    path: '/useless/infinite',
    disabled: true,
  },
  {
    id: 'wait-button',
    titleKey: 'useless.items.wait-button.title',
    subtitleKey: 'useless.items.wait-button.subtitle',
    descriptionKey: 'useless.items.wait-button.description',
    icon: 'clock',
    path: '/useless/wait',
    disabled: true,
  },
];
