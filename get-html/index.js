const puppeteer = require("puppeteer");

const fetch = async (url) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--headless"],
  });

  const page = await browser.newPage();

  await page.goto(url);

  const frame = await page.mainFrame();
  const html = await frame.content();

  await browser.close();

  return html;
};

if (require.main === module) {
  const url = process.argv[process.argv.length - 1];
  if (!url.match(/^https?:\/\//)) {
    throw Error("error: need an absolute URL");
  }
  fetch(url)
    .then(console.log)
    .catch((e) => {
      throw e;
    });
}
