import { createRequire } from "module";
const require = createRequire(import.meta.url);

let appHandler;

try {
  const server = require("../dist/index.cjs");
  appHandler = server.default || server;
} catch (e) {
  console.error("Failed to load server:", e);
}

export default function handler(req, res) {
  if (appHandler) {
    return appHandler(req, res);
  }
  res.status(500).send("Server failed to initialize. Check build logs.");
}
