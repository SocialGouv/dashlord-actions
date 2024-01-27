export const smallUrl = (url: string): string =>
  url &&
  url
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

export const slugifyUrl = (url: string): string =>
  smallUrl(url).replace(/[\W_]+/g, "-");

export const getHostName = (url: string): string =>
  url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .replace(/^([^/]+)\/.+$/, "$1");

export const getLastUrlSegment = (url: string): string =>
  url.substring(url.lastIndexOf("/") + 1);

export const sortByKey = (key: string) => (a: any, b: any) => {
  if (a[key] > b[key]) {
    return 1;
  }
  if (a[key] < b[key]) {
    return -1;
  }
  return 0;
};

export const isToolEnabled = (
  name: DashlordTool,
  url: string = null
): boolean => {
  const dashlordConfig: DashLordConfig = require("./config.json");
  if (!dashlordConfig.tools) return true;
  let enabledGlobally = false;
  const hasTools = !!dashlordConfig.tools;
  // retro-compat array format
  if (hasTools) {
    if (Array.isArray(dashlordConfig.tools)) {
      enabledGlobally = dashlordConfig.tools.includes(name);
    } else {
      enabledGlobally = dashlordConfig.tools[name] === true;
    }
  }
  const urlConfig = dashlordConfig.urls.find((url2) => url2.url === url);
  const hasUrlTools =
    urlConfig && urlConfig.tools && urlConfig.tools[name] !== undefined;
  const disabledForUrl = hasUrlTools ? urlConfig.tools[name] === false : false;

  return enabledGlobally && !disabledForUrl;
};

export const letterGradeValue = (grade: string): number =>
  ({
    "A+": 200,
    A: 190,
    "A-": 180,
    "B+": 170,
    B: 160,
    "B-": 150,
    "C+": 140,
    C: 130,
    "C-": 120,
    "D+": 110,
    D: 100,
    "D-": 90,
    "E+": 80,
    E: 70,
    "E-": 60,
    "F+": 50,
    F: 40,
    "F-": 30,
  }[grade] || 0);

export const btoa = (b: any) => Buffer.from(b).toString("base64");

const lettersSeverities = {
  A: "success",
  B: "info",
  C: "warning",
  D: "warning",
  E: "error",
  F: "error",
  G: "error",
};
export const letterToSeverity = (letter: string) => {
  const firstLetter = letter.trim().substring(0, 1).toUpperCase();
  return lettersSeverities[firstLetter] || "info";
};
