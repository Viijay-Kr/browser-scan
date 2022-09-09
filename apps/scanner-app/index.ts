import { startServer, serveStatic } from '@browser-scan/browser-scan-services';
import path from 'path';
serveStatic(path.resolve(__dirname, "build"), path.resolve(__dirname, "build/static"));
startServer();