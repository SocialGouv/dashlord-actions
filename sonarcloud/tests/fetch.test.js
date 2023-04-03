const generateJson = require("../src");

test("get results from sonarcloud", async () => {
  expect(
    await generateJson(["sensgithub/eHospital", "zabbix/zabbix"])
  ).toMatchSnapshot();
});
