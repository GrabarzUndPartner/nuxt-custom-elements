import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/*.test.js'],
    testTimeout: 120_000,
    hookTimeout: 120_000
  }
});
