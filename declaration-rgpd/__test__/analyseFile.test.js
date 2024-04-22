const { analyseFile, analyseDom } = require("..");
const fs = require("fs");
const { JSDOM } = require("jsdom");

test("ressourcerie: should return ml and pc", async () => {
  const output = await analyseFile("./__test__/samples/ressourcerie.html", {
    url: "https://ressourcerie.fabrique.social.gouv.fr",
  });
  expect(output).toMatchSnapshot();
});

test("1000jours-blues: should return ml and pc", async () => {
  const output = await analyseFile("./__test__/samples/1000jours-blues.html", {
    url: "https://1000jours-blues.fabrique.social.gouv.fr",
  });
  expect(output).toMatchSnapshot();
});

test("lba: should return ml and pc", async () => {
  const output = await analyseFile("./__test__/samples/lba.html", {
    url: "https://labonnealternance.apprentissage.beta.gouv.fr",
  });
  expect(output).toMatchSnapshot();
});

test("should return ml and pc and thirdparties data", async () => {
  const thirdPartiesOutput = fs
    .readFileSync("./__test__/samples/thirdparties.json")
    .toString();
  const output = await analyseFile("./__test__/samples/ressourcerie.html", {
    thirdPartiesOutput,
    url: "https://ressourcerie.fabrique.social.gouv.fr",
  });
  expect(output).toMatchSnapshot();
});

test("should not detect ml nor pc", async () => {
  const html = `Some content Without efficient, transparent bloatware, you will lack architectures. Quick: do you have a plan to become customized. Our feature set is unparalleled, but our sexy raw bandwidth and easy configuration is usually considered a terrific achievement. Imagine a combination of VOIP and Flash. What does the industry jargon '60/24/7/365' really mean? These innovations help CMOs challenged with the delivery of omnichannel digital experiences for some of the customer journey. We will disintermediate the power of returns-on-investment to monetize. Is it more important for something to be customer-directed? What does the industry jargon '60/24/7/365' really mean? Think granular. Without macro-vertical CAE, you will lack synergies. Our infinitely reconfigurable feature set is unparalleled, but our robust feature set, but our capability to upgrade. We think we know that if you integrate intuitively then you may also reintermediate magnetically. That is a remarkable achievement taking into account this month's financial state of things! If all of this may seem confounding to you, that's because it is! If you incentivize dynamically, you may have to exploit vertically. What do we brand? Anything and everything, regardless of semidarkness! Our technology takes the best aspects of VOIP and Dynamic HTML. These innovations help CMOs challenged with the delivery of omnichannel digital experiences for some of the customer journey.`;
  const dom = await new JSDOM(html);
  const output = await analyseDom(dom, {
    url: "https://ressourcerie.fabrique.social.gouv.fr",
  });
  expect(output.find((o) => o.slug === "ml").mention).toEqual(null);
  expect(output.find((o) => o.slug === "ml").score).toEqual(0);
  expect(output.find((o) => o.slug === "pc").mention).toEqual(null);
  expect(output.find((o) => o.slug === "pc").score).toEqual(0);
});

test("should detect ml : mentions légales", async () => {
  const html = `Some content Without efficient, transparent bloatware, you will lack architectures. Quick: do you have a plan to become customized. Our feature set is unparalleled, <a href="/mentions">Nos mentions légales blablal</a> raw bandwidth and easy configuration is usually considered a terrific achievement. Imagine a combination of VOIP and Flash. What does the industry jargon '60/24/7/365' really mean? These innovations help CMOs challenged with the delivery of omnichannel digital experiences for some of the customer journey. We will disintermediate the power of returns-on-investment to monetize. Is it more important for something to be customer-directed? What does the industry jargon '60/24/7/365' really mean? Think granular. Without macro-vertical CAE, you will lack synergies. Our infinitely reconfigurable feature set is unparalleled, but our robust feature set, but our capability to upgrade. We think we know that if you integrate intuitively then you may also reintermediate magnetically. That is a remarkable achievement taking into account this month's financial state of things! If all of this may seem confounding to you, that's because it is! If you incentivize dynamically, you may have to exploit vertically. What do we brand? Anything and everything, regardless of semidarkness! Our technology takes the best aspects of VOIP and Dynamic HTML. These innovations help CMOs challenged with the delivery of omnichannel digital experiences for some of the customer journey.`;
  const dom = await new JSDOM(html);
  const output = await analyseDom(dom, {
    url: "https://ressourcerie.fabrique.social.gouv.fr",
  });
  expect(output).toMatchSnapshot();
});

test("should detect pc : Données personnelles", async () => {
  const html = `Some content Without efficient, transparent bloatware, you will lack architectures. Quick: do you have a plan to become customized. Our feature set is unparalleled, <a href="/some">Données personnelles</a> raw bandwidth and easy configuration is usually considered a terrific achievement. Imagine a combination of VOIP and Flash. What does the industry jargon '60/24/7/365' really mean? These innovations help CMOs challenged with the delivery of omnichannel digital experiences for some of the customer journey. We will disintermediate the power of returns-on-investment to monetize. Is it more important for something to be customer-directed? What does the industry jargon '60/24/7/365' really mean? Think granular. Without macro-vertical CAE, you will lack synergies. Our infinitely reconfigurable feature set is unparalleled, but our robust feature set, but our capability to upgrade. We think we know that if you integrate intuitively then you may also reintermediate magnetically. That is a remarkable achievement taking into account this month's financial state of things! If all of this may seem confounding to you, that's because it is! If you incentivize dynamically, you may have to exploit vertically. What do we brand? Anything and everything, regardless of semidarkness! Our technology takes the best aspects of VOIP and Dynamic HTML. These innovations help CMOs challenged with the delivery of omnichannel digital experiences for some of the customer journey.`;
  const dom = await new JSDOM(html);
  const output = await analyseDom(dom, {
    url: "https://ressourcerie.fabrique.social.gouv.fr",
  });
  expect(output).toMatchSnapshot();
});
