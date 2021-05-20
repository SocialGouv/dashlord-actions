const fs = require("fs");
const path = require("path");
const YAML = require("yaml");

const DASHLORD_REPO_PATH = process.env.DASHLORD_REPO_PATH || ".";
/**
 * Get hostname of a given URL
 *
 * @param {string} url The full URL
 *
 * @returns {string|null}
 */
const toHostname = (url) =>
  (url &&
    // exclude relative urls
    !url.match(/^\//) &&
    url
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "")
      .replace(/^([^/]+)\/.+$/, "$1")
      .toLowerCase()) ||
  null;

/**
 * Read text file
 *
 * @param {string} filePath The full path to file
 *
 * @returns {string} file contents
 */
const readFile = (filePath) => fs.readFileSync(filePath).toString();

/**
 * Write text file
 *
 * @param {string} filePath The full path to file
 * @param {string} content Text content
 *
 * @returns {void}
 */
const writeFile = (filePath, content) => fs.writeFileSync(filePath, content);

/**
 * Get list of urls from a text file
 *
 *
 * @returns {UrlConfig[]} a list of urls
 */
const getUrls = () => {
  if (fs.existsSync(path.join(DASHLORD_REPO_PATH, "dashlord.yaml"))) {
    return YAML.parse(readFile(path.join(DASHLORD_REPO_PATH, "dashlord.yaml")))
      .urls;
  } else if (fs.existsSync(path.join(DASHLORD_REPO_PATH, "dashlord.yml"))) {
    return YAML.parse(readFile(path.join(DASHLORD_REPO_PATH, "dashlord.yml")))
      .urls;
  } else if (fs.existsSync(path.join(DASHLORD_REPO_PATH, "urls.txt"))) {
    return readFile(path.join(DASHLORD_REPO_PATH, "urls.txt"))
      .split("\n")
      .filter((r) => !r.match(/^\s*#/)) // remove comments
      .filter(Boolean) // remove noise
      .map((url) => url.toLowerCase())
      .map((url) => ({
        url,
      }));
  } else {
    console.error("Cannot find dashlord.yaml or urls.txt");
    return [];
  }
};

module.exports = { readFile, writeFile, toHostname, getUrls };
