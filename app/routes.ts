import type { RouteConfig } from '@react-router/dev/routes';
import { index, layout, route } from '@react-router/dev/routes';

export default [
  layout('pages/layout.tsx', [
    index('pages/home.tsx'),
    route('example-1', 'pages/example-1.tsx'),
    route('example-2', 'pages/example-2.tsx'),
    route('example-3', 'pages/example-3.tsx'),
    route('example-4', 'pages/example-4.tsx'),
    route('example-5', 'pages/example-5.tsx'),
    route('example-6', 'pages/example-6.tsx'),
    route('example-6/:id', 'pages/example-6-detail.tsx'),
    route('example-7', 'pages/example-7.tsx'),
    route('example-8', 'pages/example-8.tsx'),
    route('example-9', 'pages/example-9.tsx'),
    route('dashboard', 'pages/dashboard/layout.tsx', [
      index('pages/dashboard/index.tsx'),
      route('settings', 'pages/dashboard/settings.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
