const summary = require("./ecoindex");

const tests = [
  {
    title: "invalid report",
    report: null,
    expected: undefined,
  },
  {
    title: "no alert",
    report: [
      {
        width: 1920,
        height: 1080,
        url: "https://maisondelautisme.gouv.fr",
        size: 2028.599,
        nodes: 329,
        requests: 69,
        grade: "C",
        score: 61.0,
        ges: 1.78,
        water: 2.67,
        ecoindex_version: "5.4.2",
        date: "2023-04-14 13:00:04.227090",
        page_type: null,
      },
    ],
    expected: { ecoindexGrade: "C" },
  },
];

describe("dependabot", () => {
  tests.forEach((t) => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, () => {
      //@ts-expect-error
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
