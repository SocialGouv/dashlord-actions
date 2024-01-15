// need write API key to create missing urls

const apiKey = process.env.UPDOWNIO_API_KEY;

const API_HTTP = "https://updown.io/api";

/**
 * compare given urls to updown API
 * @function
 * @param {string[]} urls - urls to check
 * @returns {Promise<string[]>} - invalid urls
 */
const getInvalidUrls = async (urls) => {
  const apiUrl = encodeURI(`${API_HTTP}/checks?api-key=${apiKey}`);
  /** @type {{url}[]} */
  const checks = await fetch(apiUrl)
    .then((r) => r.json())
    .then((json) => {
      if (json.error) {
        console.error("e", json.error);
        throw new Error(json.error);
      }
      return json;
    });

  /**
   *
   * @param {string} url
   * @returns boolean
   */
  const hasUrl = (url) =>
    !!checks.find(
      (item) =>
        item.url.toLowerCase().replace(/\/$/, "") ===
        url.toLowerCase().replace(/\/$/, "")
    );

  return urls.filter((url) => !hasUrl(url));
};

const createNewUpDownCheck = async (url) => {
  const apiUrl = encodeURI(`${API_HTTP}/checks?api-key=${apiKey}`);
  const result = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, published: true }),
  }).then((r) => r.json());
  if (result.error) {
    throw new Error(result.error);
  }
  console.log(JSON.stringify(result, null, 2));
};

/**
 *
 * @param {DashLordConfig} dashlordConfig
 */
const createMissingUpdownEntries = async (dashlordConfig) => {
  const urls = dashlordConfig.urls.map((url) => url.url);
  await getInvalidUrls(urls).then((urls) => {
    urls.forEach(async (url) => {
      console.log(`create new updown check for ${url}`);
      await createNewUpDownCheck(url);
    });
  });
};

module.export = { createMissingUpdownEntries };
