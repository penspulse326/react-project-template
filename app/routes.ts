import type { RouteConfig } from '@react-router/dev/routes';
import { index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    route('example-1', 'routes/example-1.tsx'),
    route('example-2', 'routes/example-2.tsx'),
    ...prefix('users', [
      index('routes/users/index.tsx'),
    ]),
    route('dashboard', 'routes/dashboard/layout.tsx', [
      index('routes/dashboard/index.tsx'),
      route('settings', 'routes/dashboard/settings.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
