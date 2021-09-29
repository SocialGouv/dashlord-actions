const execSh = require("exec-sh").promise;
const pAll = require("p-all");

const fetchReposPackages = require("./fetchReposPackages");

const trivyCmd = (image) =>
  `docker run --pull=always --rm ghcr.io/aquasecurity/trivy:0.19.2 --quiet image --no-progress --format json --severity MEDIUM,HIGH,CRITICAL ${image}`;

const scanReposPackages = async (repos) => {
  // get all packages
  const packages = await fetchReposPackages(repos);
  // aggregate scans
  return (
    await pAll(
      packages.map(async (package) => async () => {
        console.warn(`Scan image ${package.image}:latest`);
        let child;
        try {
          // scan latest image
          child = await execSh(trivyCmd(package.image + ":latest"), true);
        } catch (e) {
          if (e || e.stderr) {
            console.error(e);
            console.error(e.stderr);
          }
          return {
            ...package,
            trivy: null,
          };
        }
        return {
          ...package,
          trivy: JSON.parse(child.stdout)[0],
        };
      }),
      { concurrency: 1 }
    )
  ).filter(Boolean);
};

module.exports = scanReposPackages;

if (require.main === module) {
  const repos = process.argv[process.argv.length - 1];
  if (repos.match(/^([^/]+\/[^/]+,?)+$/)) {
    scanReposPackages(repos.split(",")).then((results) =>
      console.log(JSON.stringify(results, null, 2))
    );
  } else {
    console.error(
      "USAGE: scanReposPackages.js org1/repo1,org1/repo2,org2/repo5"
    );
  }
}
