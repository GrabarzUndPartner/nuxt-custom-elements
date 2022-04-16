import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    include: ['test/*.test.js'],
    testTimeout: 30_000,
    hookTimeout: 30_000
  }
});
