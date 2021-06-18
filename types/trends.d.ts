declare module "file-util-git-history";

// todo: use nodegit declarations
type Commit = {
  date: function
  getEntry: function
  sha: function
  repo: any
}

type GitHistoryEntry = {
  commit: Commit;
};

type GitHistory = GitHistoryEntry[];

type UrlMetricsHistoryValue = { date: string; value: string | number };
type UrlMetricsHistoryValues = Record<string, UrlMetricsHistoryValue[]>;
type UrlMetricsHistory = Record<string, UrlMetricsHistoryValues>;
