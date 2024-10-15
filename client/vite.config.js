import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/sitemap.xml": "http://localhost:3000",
      "/robots.txt": "http://localhost:3000",
      // proxy requests to Express server
    },
  },
});
