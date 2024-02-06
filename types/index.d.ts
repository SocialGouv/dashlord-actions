/// <reference path="./summary.d.ts" />
/// <reference path="./trends.d.ts" />
/// <reference path="./lighthouse.d.ts" />

type UrlConfig = {
  url: string;
  category?: string;
  title?: string;
  tags?: string[];
  repositories?: string[];
  pages?: string[];
  betaId?: string;
};

type ColorVariant = "info" | "success" | "warning" | "danger";

type DashlordTool =
  | "404"
  | "http"
  | "lighthouse"
  | "nuclei"
  | "testssl"
  | "nmap"
  | "thirdparties"
  | "updownio"
  | "wappalyzer"
  | "dependabot"
  | "codescan"
  | "zap"
  | "stats"
  | "budget_page"
  | "screenshot"
  | "trivy"
  | "betagouv"
  | "github_repository"
  | "declaration-a11y"
  | "declaration-rgpd"
  | "ecoindex"
  | "dsfr"
  | "budget_page"
  | "sonarcloud";

// this should be maintained in https://github.com/SocialGouv/dashlord/blob/main/schema.json
type DashLordConfig = {
  title: string;
  entity: string;
  description: string;
  footer: string;
  tools?: DashlordTool[] | Record<DashlordTool, boolean>;
  urls: UrlConfig[];
  marianne?: boolean;
  loginUrl?: string;
  matomoId?: number;
  matomoUrl?: string;
  operator?: Operator;
  updownioStatusPage?: string;
  updownioRecipients?: string[];
};

type Operator = {
  /** Default direction is horizontal */
  logo: string | { src: string; direction: "horizontal" | "vertical" };
  name: string;
};

type SslTestReportEntry = {
  id: string;
  ip: string;
  port: string;
  severity: string;
  finding: string;
};

type SslTestReport = SslTestReportEntry[];

type HttpTestReport = {
  name: string;
  score_description: string;
  pass: boolean;
  score_modifier: number;
};

type HttpReport = {
  details: Record<any, HttpTestReport>;
  url: string;
  grade: string;
};

type ZapReportSiteAlert = {
  name: string;
  riskcode: string;
  confidence: string;
  riskdesc: string;
  desc: string;
};

type ZapReportSite = {
  "@name": string;
  "@host": string;
  alerts: ZapReportSiteAlert[];
};

type ZapReport = {
  "@version": string;
  "@generated": string;
  site: ZapReportSite[];
};

type NucleiReportInfo = {
  severity: string;
  name: string;
};

type NucleiReportEntry = {
  request?: string;
  response?: string;
  info: NucleiReportInfo;
  type: string;
  ip: string;
  host: string;
  matched: string;
  templateID: string;
  matcher_name?: string;
};

type NucleiReport = NucleiReportEntry[];

type DependabotPackage = {
  name: string;
};

type DependabotVulnerabilityAlerts = {
  totalCount: number;
  nodes: DependabotNode[];
};

type DependabotAdvisoryIdentifier = {
  type: string;
  value: string;
};

type DependabotAdvisoryReference = {
  url: string;
};

type DependabotAdvisory = {
  references: DependabotAdvisoryReference[];
  identifiers: DependabotAdvisoryIdentifier[];
};

type DependabotSecurityVulnerability = {
  severity: string;
  package: DependabotPackage;
  advisory: DependabotAdvisory;
};

type DependabotNode = {
  createdAt: string;
  dismissedAt?: string;
  securityVulnerability: DependabotSecurityVulnerability;
};

type DependabotRepository = {
  url: string;
  grade: string;
  vulnerabilityAlerts: DependabotVulnerabilityAlerts;
};

type DependabotReport = {
  totalCount: number;
  grade: string;
  repositories: DependabotRepository[];
};

type CodescanRule = {
  severity: string;
  name: string;
  description: string;
};

type CodescanAlert = {
  html_url: string;
  rule: CodescanRule;
};

type CodescanRepository = {
  url: string;
  grade: string;
  alerts: CodescanAlert[];
};

type CodescanReport = {
  grade: string;
  totalCount: number;
  repositories: CodescanRepository[];
};

type NmapVulnerability = {
  is_exploit: boolean;
  cvss: string;
  id: string;
};

type NmapService = {
  id: string;
  product: string;
  name: string;
  vulnerabilities: NmapVulnerability[];
};

type NmapOpenPort = {
  service: NmapService;
};

type NmapReport = {
  grade: string;
  protocol: string;
  host: string;
  closed_ports: number;
  open_ports: NmapOpenPort[];
};

type ThirdPartyTracker = {
  type: string;
  url: string;
  details?: {
    id: string;
    message?: string;
  };
};

type ThirdPartyCookie = {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  size: number;
  httpOnly: boolean;
  secure: boolean;
  session: boolean;
  sameParty: boolean;
  sourceScheme: string;
  sourcePort: number;
};

type GeoIpEndpoint = {
  country?: {
    iso_code: string;
    names: {
      fr: string;
    };
  };
  city?: {
    names: {
      fr?: string;
    };
  };
};

type ThirdPartyEndpoint = {
  hostname: string;
  ip?: string | null;
  geoip: GeoIpEndpoint | null;
};

type ThirdPartiesReportCookies = ThirdPartyCookie[];
type ThirdPartiesReportTrackers = ThirdPartyTracker[];
type ThirdPartiesReportEndpoints = ThirdPartyEndpoint[];

type ThirdPartiesReport = {
  cookies: ThirdPartiesReportCookies;
  trackers: ThirdPartiesReportTrackers;
  endpoints: ThirdPartiesReportEndpoints;
};

type WappalyzerCategory = {
  id: number;
  slug: string;
  name: string;
};

type WappalyzerTechnology = {
  slug: string;
  name: string;
  confidence: number;
  website: string;
  categories: WappalyzerCategory[];
};

type WappalyzerUrl = {
  status: number;
  error?: string;
};

type WappalyzerReport = {
  urls: Record<string, WappalyzerUrl | undefined>;
  technologies: WappalyzerTechnology[];
};

type UpDownReport = {
  token: string;
  url: string;
  uptime: number;
  ssl?: {
    valid: boolean;
    expires_at: string;
  };
  metrics?: {
    apdex?: number;
    timings: {
      total: number;
    };
  };
  uptimeGrade: string;
  apdexGrade: string;
};

type Wget404Report = string[];

type DsFrReport = { detected: boolean };

type UrlReport = UrlConfig & {
  lhr?: LighthouseReport | LighthouseReport[] | null;
  testssl?: SslTestReport | null;
  nmap?: NmapReport | null;
  http?: HttpReport | null;
  nuclei?: NucleiReport | null;
  thirdparties?: ThirdPartiesReport | null;
  zap?: ZapReport | null;
  wappalyzer?: WappalyzerReport | null;
  updownio?: UpDownReport | null;
  dependabot?: DependabotReport | null;
  codescan?: CodescanReport | null;
  screenshot?: boolean | null;
  summary: UrlReportSummary;
  stats?: PageReport | null;
  budget_page?: PageReport | null;
  404?: Wget404Report | null;
  trivy?: TrivyReport | null;
  "declaration-a11y"?: DeclarationA11yReport | null;
  "declaration-rgpd"?: DeclarationRgpdReport | null;
  betagouv?: BetagouvReport;
  ecoindex?: EcoIndexReport;
  dsfr?: DsFrReport;
};

type BetagouvReportPhase = {
  name: string;
  start: string;
};

type BetagouvReport = {
  id: string;
  attributes: {
    repository: string;
    phases: BetagouvReportPhase[];
    pitch: string;
  };
};

type DashLordReport = UrlReport[];

type PageReport = {
  grade: string;
  url: string;
  uri: string;
};

type DeclarationA11yReport = {
  mention: string | null;
  declarationUrl?: string;
};

type DeclarationRgpdItem = {
  slug: string;
  mention: string | null;
  declarationUrl?: string;
  maxScore: number;
  score: number;
  missingWords: string[];
  missingTrackers: string[];
};
type DeclarationRgpdReport = DeclarationRgpdItem[];

type TrivyReport = TrivyScanResult[];

// interface TrivyImageReport {
//   name: string;
//   url: string;
//   image: string;
//   trivy: TrivyScanResult;
// }

interface TrivyScanResult {
  ArtifactName: string;
  Target: string;
  Results: TrivyArtifactResult[];
  //Vulnerabilities?: Vulnerability[];
}

interface TrivyArtifactResult {
  Target: string;
  Type: string;
  Class: string;
  Vulnerabilities: Vulnerability[];
}

interface Vulnerability {
  VulnerabilityID: string;
  PkgName: string;
  PrimaryURL: string;
  Title?: string;
  Severity: string;
  FixedVersion?: string;
  CVSS: {
    nvd: {
      V2Score: number;
      V3Score: number;
    };
    redhat: {
      V3Score: number;
    };
  };
}

type EcoIndexReportRow = {
  width: number;
  height: number;
  url: string;
  size: number;
  nodes: number;
  requests: number;
  grade: string;
  score: number;
  ges: number;
  water: number;
  ecoindex_version: string;
  date: string;
  page_type: any;
};

type EcoIndexReport = EcoIndexReportRow[];

interface SonarCloudRepoReport {
  repo: string;
  result: SonarCloudRepoRepoResult;
}

interface SonarCloudRepoRepoResult {
  name: string;
  isMain: boolean;
  type: string;
  status: SonarCloudRepoStatus;
  analysisDate: string;
  commit: SonarCloudRepoRepoCommit;
}

interface SonarCloudRepoStatus {
  bugs: number;
  vulnerabilities: number;
  codeSmells: number;
  qualityGateStatus?: string;
}

interface SonarCloudRepoRepoCommit {
  sha: string;
  date: string;
  message: string;
}

type SonarCloudReport = SonarCloudRepoReport[];
