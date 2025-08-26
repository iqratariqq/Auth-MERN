import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 5000,
  },
  // 👇 ye ensure karega unknown routes bhi index.html pe redirect ho
  build: {
    outDir: "dist",
  },
  optimizeDeps: {},
});
