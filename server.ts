import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Health check endpoint for Fly.io / load balancers
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from the Vite build directory
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for Single Page Application client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Session Zero server running in production on http://0.0.0.0:${PORT}`);
});
