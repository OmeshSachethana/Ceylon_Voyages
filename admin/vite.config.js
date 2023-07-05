import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ include: "**/*.jsx" })],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
