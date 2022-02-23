const summary = require("./declaration-rgpd");

const tests = [
  {
    mention: undefined,
    expected: { "declaration-rgpd": undefined },
  },
];

describe("declaration-rgpd", () => {
  tests.forEach((t) => {
    test(`${t.mention} should return ${JSON.stringify(t.expected)}`, () => {
      //@ts-expect-error
      expect(summary(t)).toEqual(t.expected);
    });
  });
});
