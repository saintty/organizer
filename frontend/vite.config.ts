import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components/common"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@type": path.resolve(__dirname, "./src/types/"),
      "@stub": path.resolve(__dirname, "./src/stub/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@context": path.resolve(__dirname, "./src/context/"),
    },
  },
});
