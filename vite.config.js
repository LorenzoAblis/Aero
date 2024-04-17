import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: { https: true },
  plugins: [mkcert(), react()],
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });
