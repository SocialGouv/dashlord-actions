const summary = require("./declaration-a11y");

const tests = [
  {
    mention: null,
    declarationUrl : "https://declaration.url",
    expected: { "declaration-a11y": "F" },
  },
  {
    mention: "Accessibilité : partiellement conforme",
    declarationUrl : "",
    expected: { "declaration-a11y": "F" },
  },
  {
    mention: "Accessibilité : partiellement conforme",
    declarationUrl : "https://declaration.url",
    expected: { "declaration-a11y": "A" },
  }
];

describe("declaration-a11y", () => {
  tests.forEach((t) => {
    test(`Mention: "${t.mention}" & url: "${t.declarationUrl}" should return ${JSON.stringify(t.expected)}`, () => {
      expect(summary(t)).toEqual(t.expected);
    });
  });

  test('A missing report should return not return a grade', () => {
    //@ts-expect-error
    expect(summary(undefined)).toEqual({"declaration-a11y": undefined});
  })
});
