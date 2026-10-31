import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    minify: "esbuild",
    lib: {
      entry: "src/main.jsx",
      formats: ["es"],
      fileName: () => "app.js",
    },
    outDir: "dist/assets",
    emptyOutDir: false,
  },
});
