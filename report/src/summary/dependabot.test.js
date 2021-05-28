const summary = require("./dependabot");

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
        vulnerabilityAlerts: {
          totalCount: 0,
          nodes: [],
        },
      },
    ],
    expected: { dependabotGrade: "A", dependabotCount: 0 },
  },
  {
    title: "single alert",
    report: [
      {
        vulnerabilityAlerts: {
          totalCount: 1,
          nodes: [],
        },
      },
    ],
    expected: { dependabotGrade: "A", dependabotCount: 1 },
  },
  {
    title: "single MEDIUM alert",
    report: [
      {
        vulnerabilityAlerts: {
          totalCount: 1,
          nodes: [
            {
              securityVulnerability: {
                severity: "MEDIUM",
              },
            },
          ],
        },
      },
    ],
    expected: { dependabotGrade: "B", dependabotCount: 1 },
  },
  {
    title: "single CRITICAL alert",
    report: [
      {
        vulnerabilityAlerts: {
          totalCount: 1,
          nodes: [
            {
              securityVulnerability: {
                severity: "CRITICAL",
              },
            },
          ],
        },
      },
    ],
    expected: { dependabotGrade: "F", dependabotCount: 1 },
  },
];

describe("dependabot", () => {
  tests.forEach((t) => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, () => {
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
