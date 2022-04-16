import { defineConfig } from 'vite';

export default defineConfig({
  include: ['test/**/*.test.js'],
  test: {
    testTimeout: 30_000,
    hookTimeout: 30_000
  }
});
