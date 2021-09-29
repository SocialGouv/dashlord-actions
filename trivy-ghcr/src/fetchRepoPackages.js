const jsdom = require("jsdom");

const { JSDOM } = jsdom;

/*
fetch repo images using GitHub UI as i didnt find a way to get repo docker images via API
*/
const fetchRepoPackages = async ({ org, repo, page = 1 }) => {
  const options = {};
  const dom = await JSDOM.fromURL(
    `https://github.com/orgs/${org}/packages?repo_name=${repo}&page=${page}`,
    options
  );

  const packages = Array.from(
    dom.window.document.querySelectorAll("#org-packages .Link--primary")
  )
    .filter((node) =>
      // only ghcr packages
      node.getAttribute("href").match(/\/packages\/container\/package\//)
    )
    .map((node) => {
      const name = node.innerHTML;
      return {
        name,
        url: `https://github.com/${node.getAttribute("href")}`,
        image: `ghcr.io/${org}/${node.getAttribute("title")}`,
        // todo: tags
      };
    });

  const next = dom.window.document.querySelector(
    ".paginate-container a[rel='next']"
  );

  if (next) {
    const nextPackages = await fetchRepoPackages({ org, repo, page: page + 1 });
    return packages.concat(nextPackages);
  }
  return packages;
};

module.exports = fetchRepoPackages;
