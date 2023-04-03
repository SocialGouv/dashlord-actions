const core = require("@actions/core");

const SONARCLOUD_API_ROOT =
  process.env.SONARCLOUD_API_ROOT || "https://sonarcloud.io/api";

const SONARCLOUD_API_TOKEN = process.env.SONARCLOUD_API_TOKEN || "";

const qs = (obj = {}) =>
  Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

/**
 *
 * @param {string} path
 * @param {object} [params]
 * @returns
 */
const sonarApi = (path, params = {}, method = "GET") =>
  fetch(`${SONARCLOUD_API_ROOT}/${path}?${qs(params)}`, {
    headers: {
      Authorization: `Bearer ${SONARCLOUD_API_TOKEN}`,
    },
    method,
  }).then((r) => r.json());

/**
 *
 * @param {string} repo
 */
const getSonarCloudKey = (repo) => {
  const [org, repo2] = repo.split("/");
  return `${org}_${repo2}`;
};

/**
 *
 * @param {string[]} repos
 * @returns
 */
const generateJson = async (repos) => {
  core.info(`generate sonarcloud.json for ${repos}`);

  const queries = await Promise.all(
    repos.map((repo) =>
      sonarApi("project_branches/list", {
        project: getSonarCloudKey(repo),
      }).then((result) => {
        if (result.errors && result.errors.length) {
          console.log(`Invalid result for ${repo}`);
          return null;
        }
        const mainBranch =
          result.branches &&
          result.branches.find(
            /** @param {any} branch */
            (branch) => branch.isMain
          );

        if (!mainBranch) {
          return null;
        }

        return {
          repo,
          result: {
            ...mainBranch,
            commit: {
              ...mainBranch.commit,
              author: undefined, //anonymify
            },
          },
        };
      })
    )
  );

  return queries.filter(Boolean);
};

module.exports = generateJson;

if (require.main === module) {
  const repos = process.argv[process.argv.length - 1];
  if (repos.match(/^([^/]+\/[^/]+,?)+$/)) {
    generateJson(repos.split(",").map((repo) => repo.trim())).then((results) =>
      console.log(JSON.stringify(results, null, 2))
    );
  } else {
    console.error("USAGE: index.js org1/repo1,org1/repo2,org2/repo5");
  }
}
