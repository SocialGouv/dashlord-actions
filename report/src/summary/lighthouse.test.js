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
          score: 42,
        },
        seo: {
          score: 43,
        },
        stuff: {
          score: 44,
        },
      },
    },
    expected: {
      lighthouse_performance: 1,
      lighthouse_seo: 43,
      lighthouse_stuff: 44,
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
          score: 43,
        },
        stuff: {
          score: 44,
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
      lighthouse_seo: 43,
      lighthouse_stuff: 44,
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
          score: 43,
        },
        stuff: {
          score: 44,
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
      lighthouse_seo: 43,
      lighthouse_stuff: 44,
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
