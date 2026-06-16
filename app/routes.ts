import type { RouteConfig } from '@react-router/dev/routes';
import { index, layout, route } from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    route('example-1', 'routes/example-1.tsx'),
    route('example-2', 'routes/example-2.tsx'),
    route('example-3', 'routes/example-3.tsx'),
    route('example-4', 'routes/example-4.tsx'),
    route('example-5', 'routes/example-5.tsx'),
    route('dashboard', 'routes/dashboard/layout.tsx', [
      index('routes/dashboard/index.tsx'),
      route('settings', 'routes/dashboard/settings.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
