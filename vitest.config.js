import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    include: ['test/*.test.js'],
    testTimeout: 120_000,
    hookTimeout: 120_000
  }
});
