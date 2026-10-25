import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function staticAssetsPlugin() {
  return {
    name: 'serve-and-copy-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/assets-processed/') || req.url.startsWith('/assets/'))) {
          const relativePath = decodeURIComponent(req.url.split('?')[0].slice(1));
          const filePath = path.resolve(__dirname, relativePath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              '.webp': 'image/webp',
              '.png': 'image/png',
              '.svg': 'image/svg+xml',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.json': 'application/json'
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    },
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(outDir)) {
        copyDirSync(
          path.resolve(__dirname, 'assets-processed/webp'),
          path.resolve(outDir, 'assets-processed/webp')
        );
        copyDirSync(
          path.resolve(__dirname, 'assets-processed/svg'),
          path.resolve(outDir, 'assets-processed/svg')
        );
        if (fs.existsSync(path.resolve(__dirname, 'assets-processed/manifest.json'))) {
          fs.copyFileSync(
            path.resolve(__dirname, 'assets-processed/manifest.json'),
            path.resolve(outDir, 'assets-processed/manifest.json')
          );
        }
      }
    }
  };
}

export default defineConfig({
  plugins: [staticAssetsPlugin()],
  server: {
    port: 5173,
    open: false
  }
});
