// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        // Allows import like: import Header from "@/components/Header";
        "@": path.resolve(__dirname, "src")
      }
    },
    server: {
      // Customize dev server settings if needed
      port: Number(env.VITE_DEV_PORT) || 5173,
      open: true
    },
    build: {
      // Customize build output
      outDir: "dist",
      sourcemap: env.VITE_SOURCEMAP === "true",
      rollupOptions: {
        // Example: externalize dependencies etc
      },
      target: "es2022"
    },
    define: {
      // Define global constants for use in your code
      __APP_BASE_URL__: JSON.stringify(env.VITE_APP_BASE_URL)
    }
  };
});
