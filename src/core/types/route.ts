import { RegisteredRouter } from '@tanstack/react-router';

export type AppRoutePath = keyof RegisteredRouter['routesByPath'];

export interface IRoutePath {
  label: string;
  to: AppRoutePath;
}
