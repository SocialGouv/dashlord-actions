const summary = require("./thirdparties");

const tests = [
  {
    title: "invalid report",
    report: null,
    expected: undefined,
  },
  {
    title: "empty report",
    report: {
      trackers: [],
      cookies: [],
    },
    expected: {
      cookiesGrade: "A",
      cookiesCount: 0,
      trackersGrade: "A",
      trackersCount: 0,
    },
  },
  {
    title: "sample report",
    report: {
      trackers: Array.from({ length: 2 }),
      cookies: Array.from({ length: 2 }),
    },
    expected: {
      cookiesGrade: "B",
      cookiesCount: 2,
      trackersGrade: "B",
      trackersCount: 2,
    },
  },
  {
    title: "sample report 2",
    report: {
      trackers: Array.from({ length: 12 }),
      cookies: Array.from({ length: 12 }),
    },
    expected: {
      cookiesGrade: "F",
      cookiesCount: 12,
      trackersGrade: "F",
      trackersCount: 12,
    },
  }
];

describe("thirdparties", () => {
  tests.forEach((t) => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, () => {
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
