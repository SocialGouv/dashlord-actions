const summary = require("./http");

const tests = [
  {
    title: "invalid report",
    report: null,
    expected: undefined,
  },
  {
    title: "sample report",
    report: { grade: "X" },
    expected: { httpGrade: "X" },
  },
];

describe("http", () => {
  tests.forEach((t) => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, () => {
      //@ts-expect-error
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
