const summary = require("./declaration-a11y");

const tests = [
  {
    declaration: undefined,
    expected: { "declaration-a11y": undefined },
  },
  {
    declaration: null,
    expected: { "declaration-a11y": "F" },
  },
  {
    declaration: "Accessibilité : totalement conforme",
    expected: { "declaration-a11y": "A" },
  },
  {
    declaration: "Accessibilité : partiellement conforme",
    expected: { "declaration-a11y": "B" },
  },
  {
    declaration: "Accessibilité : non conforme",
    expected: { "declaration-a11y": "C" },
  },
];

describe("declaration-a11y", () => {
  tests.forEach((t) => {
    test(`${t.declaration} should return ${JSON.stringify(t.expected)}`, () => {
      expect(summary({ declaration: t.declaration })).toEqual(t.expected);
    });
  });
});
