import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: { https: true },
  plugins: [mkcert(), react()],
});
