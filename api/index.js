import { createRequire } from "module";
const require = createRequire(import.meta.url);

let appHandler;

try {
  const server = require("../dist/index.cjs");
  appHandler = server.app || server.default || server;
} catch (e) {
  console.error("Server load error:", e);
}

export default function handler(req, res) {
  if (appHandler) {
    appHandler(req, res);
  } else {
    res.status(500).send("Server failed to initialize");
  }
}
