const summary = require("./lighthouse");

const tests = [
  {
    title: "invalid report",
    report: null,
    expected: undefined,
  },
  {
    title: "sample report",
    report: {
      categories: {
        performance: {
          score: 1,
        },
        seo: {
          score: 1,
        },
        stuff: {
          score: 1,
        },
      },
    },
    expected: {
      lighthouse_performance: 1,
      lighthouse_performanceGrade: "A",
      lighthouse_seo: 1,
      lighthouse_seoGrade: "A",
      lighthouse_stuff: 1,
      lighthouse_stuffGrade: "A",
    },
  },
  {
    title: "good performance score",
    report: {
      categories: {
        performance: {
          score: 42,
        },
        seo: {
          score: 0.5,
        },
        stuff: {
          score: 0.2,
        },
      },
      audits: {
        diagnostics: {
          details: {
            items: [
              {
                numRequests: 50,
                totalByteWeight: 1024 * 1024,
              },
            ],
          },
        },
      },
    },
    expected: {
      lighthouse_performance: 1,
      lighthouse_performanceGrade: "A",
      lighthouse_seo: 0.5,
      lighthouse_seoGrade: "D",
      lighthouse_stuff: 0.2,
      lighthouse_stuffGrade: "E",
    },
  },
  {
    title: "bad performance score",
    report: {
      categories: {
        performance: {
          score: 42,
        },
        seo: {
          score: 0.1,
        },
        stuff: {
          score: 0,
        },
      },
      audits: {
        diagnostics: {
          details: {
            items: [
              {
                numRequests: 100,
                totalByteWeight: 1024 * 1024 * 2,
              },
            ],
          },
        },
      },
    },
    expected: {
      lighthouse_performance: 0.3,
      lighthouse_performanceGrade: "E",
      lighthouse_seo: 0.1,
      lighthouse_seoGrade: "F",
      lighthouse_stuff: 0,
      lighthouse_stuffGrade: "F",
    },
  },
];

describe("lighthouse", () => {
  tests.forEach((t) => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, () => {
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
