const generateJson = require("../src");

test("get results from sonarcloud", async () => {
  const result = await generateJson(["sensgithub/eHospital", "zabbix/zabbix"]);
  expect(result.length).toEqual(2);
  expect(result[0].result.status.vulnerabilities).toBeGreaterThan(0);
  expect(result[1].result.status.vulnerabilities).toBeGreaterThan(0);
});
