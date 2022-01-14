const summary = require("./declaration-a11y");

const tests = [
  {
    mention: undefined,
    expected: { "declaration-a11y": undefined },
  },
  {
    mention: null,
    expected: { "declaration-a11y": "F" },
  },
  {
    mention: "Accessibilité : totalement conforme",
    expected: { "declaration-a11y": "F" },
  },
  {
    mention: "Accessibilité : partiellement conforme",
    expected: { "declaration-a11y": "F" },
  },
  {
    mention: "Accessibilité : non conforme",
    expected: { "declaration-a11y": "D" },
  },
  {
    mention: "Accessibilité : totalement conforme",
    declarationUrl: "https://declaration.url",
    expected: { "declaration-a11y": "A" },
  },
  {
    mention: "Accessibilité : partiellement conforme",
    declarationUrl: "https://declaration.url",
    expected: { "declaration-a11y": "B" },
  },
  {
    mention: "Accessibilité : non conforme",
    declarationUrl: "https://declaration.url",
    expected: { "declaration-a11y": "C" },
  },
];

describe("declaration-a11y", () => {
  tests.forEach((t) => {
    test(`${t.mention} should return ${JSON.stringify(t.expected)}`, () => {
      //@ts-expect-error
      expect(summary(t)).toEqual(t.expected);
    });
  });
});
