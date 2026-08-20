import { IRoutePath } from '@/core/types/route';

export const NAVIGATION_ROUTES = {
  MAIN: { label: 'Главная', to: '/' },
  COINS: { label: 'Монеты', to: '/coins/' },
} as const satisfies Record<string, IRoutePath>;
