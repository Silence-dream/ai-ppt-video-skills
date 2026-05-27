import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { codeInspectorPlugin } from "code-inspector-plugin";

export default defineConfig({
  plugins: [
    codeInspectorPlugin({ bundler: "vite" }),
    react(),
  ],
  appType: "spa",
  server: {
    port: 5173,
    fs: { allow: [".."] },
  },
});
