import { chromium } from 'playwright-core';

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });

    const content = await page.content();
    await browser.close();

    res.setHeader("Content-Type", "text/html");
    res.send(content);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error rendering the page.");
  }
}