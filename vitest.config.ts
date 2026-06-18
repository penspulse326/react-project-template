import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./app/test/setup.ts'],
    browser: {
      enabled: false,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    },
  },
});
