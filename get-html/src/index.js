const puppeteer = require("puppeteer");

const LANGUAGE = process.env.LANGUAGE || "en";

const getHTML = async (url) => {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--headless",
      `--lang=${LANGUAGE}`,
    ],
  });

  const page = await browser.newPage();

  let html = "";
  try {
    await page.goto(url);
    const frame = await page.mainFrame();
    html = await frame.content();
  } catch (e) {
    console.error("error", e);
  }

  await browser.close();

  return html;
};

module.exports = { getHTML };