const summary = require("./stats");

const tests = [
  {
    title: "invalid report",
    report: null,
    expected: undefined,
  },
  {
    title: "sample report",
    report: {
      grade: "B",
      uri: "statistiques"
    },
    expected: {
      statsGrade: "B"
    },
  },
  {
    title: "3 open ports",
    report: {
      grade: "F",
      uri: "stats"
    },
    expected: {
      statsGrade: "F"
    },
  },
];

describe("stats", () => {
  tests.forEach((t) => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, () => {
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
