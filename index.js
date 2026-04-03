const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3456;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/serp", async (req, res) => {
  try {
    const { login, password, payload } = req.body;
    const b64 = Buffer.from(`${login}:${password}`).toString("base64");
    const r = await fetch("https://api.dataforseo.com/v3/serp/google/organic/live/advanced", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${b64}` },
      body: JSON.stringify(payload),
    });
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/keywords", async (req, res) => {
  try {
    const { login, password, payload } = req.body;
    const b64 = Buffer.from(`${login}:${password}`).toString("base64");
    const r = await fetch("https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${b64}` },
      body: JSON.stringify(payload),
    });
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, () => console.log(`Proxy actif sur ${PORT}`));
