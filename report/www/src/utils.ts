export const smallUrl = (url: string): string =>
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

export const isToolEnabled = (name: DashlordTool): boolean => {
  const dashlordConfig: DashLordConfig = require("./config.json");
  if (!dashlordConfig.tools) return true;
  if (Array.isArray(dashlordConfig.tools)) {
    const hasTools = dashlordConfig.tools && dashlordConfig.tools.length;
    return (
      !hasTools ||
      !!(dashlordConfig.tools && dashlordConfig.tools.includes(name))
    );
  }
  return dashlordConfig.tools[name] === true;
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
