import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/cat-gallery-test/",
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
});