import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    alias: {
      "@/config.json": new URL("./src/config.json", import.meta.url).pathname, // some alias need absolute paths for mocking
    },
    globals: true,
    restoreMocks: true,
    onConsoleLog: () => {},
    environment: "jsdom",
    setupFiles: ["vitestSetup.ts"],
  },
});
