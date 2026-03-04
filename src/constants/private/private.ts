import type { PrivateService } from '@/types/private/private.ts';

export const PRIVATE_SERVICES: PrivateService[] = [
  {
    id: 'nextcloud',
    titleKey: 'private.items.nextcloud.title',
    subtitleKey: 'private.items.nextcloud.subtitle',
    descriptionKey: 'private.items.nextcloud.description',
    icon: 'lock',
  },
  {
    id: 'sonarqube',
    titleKey: 'private.items.sonarqube.title',
    subtitleKey: 'private.items.sonarqube.subtitle',
    descriptionKey: 'private.items.sonarqube.description',
    icon: 'barChart',
  },
];
