import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.ts', 'test/**/*.spec.ts'],
    setupFiles: ['./test/vitest.setup.ts'],
    globalSetup: ['./test/globalSetup.ts'],
    poolOptions: {
      threads: {
        singleThread: true,
      }
    },
    fileParallelism: false
  },
});
