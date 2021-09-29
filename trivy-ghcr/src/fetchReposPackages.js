const fetchRepoPackages = require("./fetchRepoPackages");

// fetch packages for a bunch of repos
const fetchReposPackages = async (repos) => {
  const images = (
    await Promise.all(
      repos.map((repo) => {
        const [org, name] = repo.split("/");
        return fetchRepoPackages({ org, repo: name });
      })
    )
  ).flat();
  return images;
};

module.exports = fetchReposPackages;

if (require.main === module) {
  const repos = process.argv[process.argv.length - 1];
  if (repos.match(/^([^/]+\/[^/]+,?)+$/)) {
    fetchReposPackages(repos.split(",")).then((packages) =>
      console.log(JSON.stringify(packages, null, 2))
    );
  } else {
    console.error(
      "USAGE: fetchReposPackages.js org1/repo1,org1/repo2,org2/repo5"
    );
  }
}
