const express = require("express");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const ENV_FILE = path.join(ROOT, ".env");

app.use(express.json({ limit: "32kb" }));
app.use(express.static(path.join(ROOT, "public"), { extensions: ["html"] }));

function generateKey() {
  return "aeth_" + crypto.randomBytes(32).toString("hex");
}

function getApiKey() {
  return process.env.AETHER_API_KEY || "";
}

function saveApiKey(key) {
  let env = "";
  try { env = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, "utf8") : ""; } catch {}
  const line = `AETHER_API_KEY=${key}`;
  if (/^AETHER_API_KEY=.*$/m.test(env)) {
    env = env.replace(/^AETHER_API_KEY=.*$/m, line);
  } else {
    env = env.replace(/\s*$/, "") + (env.trim() ? "\n" : "") + line + "\n";
  }
  fs.writeFileSync(ENV_FILE, env, { mode: 0o600 });
  process.env.AETHER_API_KEY = key;
}

function authorized(req) {
  const auth = req.get("authorization") || "";
  const supplied = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const configured = getApiKey();
  return configured && crypto.timingSafeEqual(
    Buffer.from(supplied),
    Buffer.from(configured)
  );
}

// Generate an API key only when the user explicitly presses the button.
app.post("/api/generate-key", (req, res) => {
  const key = generateKey();
  try {
    saveApiKey(key);
    res.json({
      apiKey: key,
      warning: "Save this key now. It is shown only in this response."
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save API key on this server." });
  }
});

// Normal site endpoint: no key required.
app.get("/api/sound", (req, res) => {
  // Replace this value with your ESP32/device reading.
  const level = 0;
  res.json({ level });
});

// Developer/device endpoint: requires the generated key.
app.get("/api/sound/secure", (req, res) => {
  if (!authorized(req)) return res.status(401).json({ error: "Invalid API key" });
  res.json({ level: 0, device: "ESP32", timestamp: Date.now() });
});

// API documentation endpoint.
app.get("/api", (req, res) => {
  res.json({
    name: "NAJI Sound API",
    endpoints: {
      generateKey: "POST /api/generate-key",
      publicSound: "GET /api/sound",
      secureSound: "GET /api/sound/secure (Bearer API key required)"
    }
  });
});

// Custom 404 page for everything else.
app.use((req, res) => {
  res.status(404).sendFile(path.join(ROOT, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`NAJI running on http://localhost:${PORT}`);
});
