import path from 'node:path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // svgLoader(),
  ],
  resolve: {
    alias: {
      "@design": path.resolve(__dirname, "./src"),
    },
  },
});
