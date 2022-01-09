import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';

export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  return defineConfig({
    plugins: [react(), svgrPlugin()],
    build: {
      cssCodeSplit: false,
    },
    resolve: {
      alias: [{ find: '~', replacement: resolve(__dirname, 'src') }],
    },
    server: {
      host: '0.0.0.0',
      port: 3001,
      proxy: {
        '/api': {
          target: process.env.VITE_STRAPI_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
