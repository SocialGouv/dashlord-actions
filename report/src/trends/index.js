const { gitHistory } = require("file-util-git-history");
const { Repository } = require("nodegit");

/**
 * Get history of urls metrics based on report.json GIT changes
 *
 * @param {string} gitPath path to some dashlord GIT repo
 * @param {DashLordReport} latestReport latest report (as its not yet in GIT)
 * @param {number} maxDaysHistory GIT history depth in days
 *
 * @returns {Promise<Trends>} minified JSON content
 */
async function generateTrends(gitPath, latestReport, maxDaysHistory = 30) {
  const repo = await Repository.open(gitPath);

  // get history for the report file
  /** @type {GitHistory} */
  const history = await gitHistory(`${gitPath}/report.json`);

  // ensure git history is sorted from latest to oldest commit
  history.sort((a, b) => b.commit.date() - a.commit.date());

  // will only extract N days of history
  const startDate = new Date(
    new Date().getTime() - maxDaysHistory * 24 * 60 * 60 * 1000
  );

  // compile summary contents from reports
  const commits = await Promise.all(
    history
      // include only relevant commits (in the date range)
      .reduce(
        /** @param {GitHistoryEntry[]} filteredCommits*/ (
          filteredCommits,
          entry,
          i,
          all
        ) => {
          const isAfter = entry.commit.date() >= startDate;
          const isFirstBefore = !isAfter && i === filteredCommits.length;
          // include relvant commits
          if (isAfter || isFirstBefore) {
            filteredCommits.push(entry);
          }
          return filteredCommits;
        },
        []
      )
      // extract summary content for each commit
      .map(async ({ /** @type {Commit} */ commit }) => {
        commit.repo = repo; // for some reason this is not populated by default and prevents `getEntry`
        const treeEntry = await commit.getEntry("report.json");
        const blob = await treeEntry.getBlob();
        /** @type {DashLordReport} */
        const report = JSON.parse(blob.toString());
        const summaries = report.map(({ url, summary }) => ({
          url,
          summary,
        }));
        return { sha: commit.sha(), date: commit.date(), summaries };
      })
  );

  /** @type Trends */
  const urlsHistory = {};

  // add the latest report first as a commit
  const allCommits = [
    {
      date: new Date(),
      summaries: latestReport.map(({ url, summary }) => ({
        url,
        summary,
      })),
    },
    ...commits,
  ];

  allCommits.reverse();

  // compile history of values for each url and metric
  allCommits.forEach(({ date, summaries }) => {
    summaries &&
      summaries.forEach(({ url, summary }) => {
        if (!urlsHistory[url]) {
          urlsHistory[url] = {};
        }
        summary &&
          Object.keys(summary).forEach((
            /** @type {keyof UrlReportSummary}*/ key
          ) => {
            if (!urlsHistory[url][key]) {
              urlsHistory[url][key] = [];
            }
            if (summary[key] !== undefined) {
              /** @ts-expect-error */
              urlsHistory[url][key].push({ date, value: summary[key] });
            }
          });
      });
  });
  return urlsHistory;
}

module.exports = generateTrends;

