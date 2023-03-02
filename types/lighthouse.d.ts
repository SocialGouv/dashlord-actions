type LighthouseReportCategory = {
  title: string;
  id: string;
  score: number | null;
  description?: string;
};

type LighthouseReportCategoryKey =
  | "performance"
  | "accessibility"
  | "best-practices"
  | "seo"
  | "pwa";

type LighthouseReportCategories = Record<
  LighthouseReportCategoryKey,
  LighthouseReportCategory
>;

type LighthouseReportAudits = {
  metrics: {
    details?: {
      items?: any[];
    };
  };
  diagnostics: {
    details?: {
      items?: any[];
    };
  };
};

type LighthouseReport = {
  requestedUrl: string;
  finalUrl: string;
  runWarnings: string[];
  categories: LighthouseReportCategories;
  fetchTime: string;
  audits: LighthouseReportAudits;
};
