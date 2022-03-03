const summary = require("./declaration-rgpd");

const tests = [
  {
    name: "ML & PC undefined",
    report: [
      {
        slug: "ml",
        declarationUrl: undefined,
        expected: { "declaration-rgpd": "F" },
      },
      {
        slug: "pc",
        declarationUrl: undefined,
      },
    ],
    expected: { "declaration-rgpd-ml": "F" },
  },
];

describe("declaration-rgpd", () => {
  tests.forEach((t) => {
    test(`${t.name} should return ${JSON.stringify(t.expected)}`, () => {
      //@ts-expect-error
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
