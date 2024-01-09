import * as React from "react";
import { Table } from "@dataesr/react-dsfr";
import { Search, Slash } from "react-feather";
import Link from "next/link";
import { format } from "date-fns";

import { AccessibilityWarnings } from "../lib/lighthouse/AccessibilityWarnings";
import {
  isToolEnabled,
  letterGradeValue,
  smallUrl,
  slugifyUrl,
} from "../utils";
import { Grade } from "./Grade";
import ColumnHeader from "./ColumnHeader";
import styles from "./dashboard.module.scss";
import { getLatestPhase } from "./BetagouvInfo";

type DashboardProps = { report: DashLordReport };

const IconUnknown = () => <Slash size={20} />;

const percent = (num: number | undefined): string =>
  (num !== undefined && `${Math.floor(num * 100)} %`) || "-";

const GradeBadge = ({
  grade,
  label,
  warning,
  to,
  colorVariant,
  style,
}: {
  grade: string | undefined;
  label?: string | number | undefined;
  warning?: string;
  to?: string;
  colorVariant?: ColorVariant;
  style?: React.CSSProperties;
}) => (
  <div style={{ textAlign: "center" }}>
    {grade || label ? (
      <Grade
        colorVariant={colorVariant}
        small
        warning={warning}
        grade={grade || `${label}`}
        label={label}
        to={to}
        style={style}
      />
    ) : (
      <IconUnknown />
    )}
  </div>
);

type GetColumnProps = {
  id: string;
  title: string;
  info: string;
  warning?: JSX.Element | undefined;
  hash: string;
  gradeKey: string;
  sort?: Function;
  category?: string;
  gradeLabel?: (s: UrlReport) => string | number | undefined;
  gradeStyle?: React.CSSProperties;
  colorVariant?: ColorVariant;
  getColorVariant?: (s: UrlReport) => ColorVariant;
  warningText?: (s: UrlReportSummary) => string | undefined;
};

export const Dashboard: React.FC<DashboardProps> = ({ report }) => {
  const getSummaryData = (rowData, grade) => {
    const { summary } = rowData as UrlReport;
    return (summary[grade] && letterGradeValue(summary[grade])) || -1;
  };

  //console.log(report);
  const sortSSLGrades = (a, b) =>
    b.summary.testsslExpireSoon - a.summary.testsslExpireSoon ||
    getSummaryData(a, "testsslGrade") - getSummaryData(b, "testsslGrade") ||
    1;

  const getColumn = ({
    id,
    title,
    info,
    sort,
    warning,
    hash,
    gradeKey,
    category,
    gradeLabel,
    warningText,
    colorVariant,
    getColorVariant,
    gradeStyle,
  }: GetColumnProps) => ({
    name: id,
    sortable: true,
    sort: (a, b) =>
      sort
        ? sort(a, b)
        : getSummaryData(a, gradeKey) - getSummaryData(b, gradeKey),
    label: title,
    headerRender: () => (
      <ColumnHeader title={title} info={info} warning={warning} />
    ),
    render: (rowData) => {
      const { summary } = rowData as UrlReport;
      return (
        <GradeBadge
          colorVariant={
            getColorVariant ? getColorVariant(rowData) : colorVariant
          }
          style={gradeStyle}
          grade={summary[gradeKey]}
          label={gradeLabel && gradeLabel(rowData)}
          warning={warningText && warningText(summary)}
          to={`/url/${encodeURIComponent(
            slugifyUrl((rowData as UrlReport).url)
          )}/${category ? `${category}/` : ""}#${hash}`}
        />
      );
    },
  });

  const lightHouseColumn = (id, title, info) =>
    getColumn({
      id,
      title,
      info,
      category: "best-practices",
      warning: id === "accessibility" ? <AccessibilityWarnings /> : undefined,
      hash: "lighthouse",
      gradeKey: `lighthouse_${id}Grade`,
      sort: (a, b) => {
        if (a.summary[`lighthouse_${id}`] === undefined) {
          return -1;
        }
        if (b.summary[`lighthouse_${id}`] === undefined) {
          return 1;
        }
        return (
          parseFloat(a.summary[`lighthouse_${id}`]) -
          parseFloat(b.summary[`lighthouse_${id}`])
        );
      },
      gradeLabel: (rowData) =>
        rowData.lhr && percent(rowData.summary[`lighthouse_${id}`]),
    });

  let columns = [
    {
      name: "url",
      label: `URL ${report && `(${report.length})`}`,
      sortable: true,
      render: (rowData) => (
        <div
          style={{
            width: "95%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <Link
            prefetch={false}
            href={`/url/${encodeURIComponent(
              slugifyUrl((rowData as UrlReport).url)
            )}`}
          >
            <a>
              <Search size={16} />
              &nbsp;
              {smallUrl((rowData as UrlReport).url)}
            </a>
          </Link>
        </div>
      ),
    },
  ];

  if (isToolEnabled("betagouv")) {
    columns.push(
      getColumn({
        id: "se_current_phase",
        title: "Phase",
        info: "Phase actuelle de la Startup d'Etat",
        hash: "betagouv",
        category: "informations",
        gradeKey: "seCurrentPhase",
        gradeStyle: { width: 140 },
        colorVariant: "info",
        sort: (a, b) => {
          // ensure we use latest phase for sorting
          if (!a.betagouv) return 1;
          if (!b.betagouv) return -1;
          return (
            getLatestPhase(b.betagouv.attributes.phases).index -
            getLatestPhase(a.betagouv.attributes.phases).index
          );
        },
        gradeLabel: (rowData) =>
          rowData.betagouv &&
          getLatestPhase(rowData.betagouv.attributes.phases).label,
      })
    );
  }

  if (isToolEnabled("declaration-a11y")) {
    columns.push(
      getColumn({
        id: "declaration-a11y",
        title: "Déclaration d'accessibilité",
        info: "Présence de la mention de conformité et de la déclaration",
        hash: "declaration-a11y",
        gradeKey: "declaration-a11y",
        category: "best-practices",
      })
    );
  }

  if (isToolEnabled("github_repository")) {
    columns.push(
      getColumn({
        id: "github_repository",
        title: "Code ouvert",
        info: "Le code est-il ouvert ?",
        hash: "github_repository",
        category: "best-practices",
        gradeKey: "githubRepositoryGrade",
        gradeLabel: (rowData) => {
          //@ts-ignore
          const count = rowData.summary.githubRepositoryGrade;
          if (count === "A") {
            return "✔";
          }
          return count;
        },
      })
    );
  }

  if (isToolEnabled("declaration-rgpd")) {
    columns.push(
      getColumn({
        id: "declaration-rgpd-ml",
        title: "Mentions légales",
        info: "Présence des mentions légales et conformité de celles-ci",
        hash: "declaration-rgpd",
        gradeKey: "declaration-rgpd-ml",
        category: "best-practices",
        gradeLabel: (rowData) => {
          switch (rowData.summary["declaration-rgpd-ml"]) {
            case "A":
              return "✔";
            case "D":
              return "";
            case "F":
              return "";
          }
        },
        warningText: (summary) =>
          (summary["declaration-rgpd-ml"] === "D" &&
            "Les mentions légales sont présentes mais incomplètes. Consultez les détails pour plus d'informations") ||
          (summary["declaration-rgpd-ml"] === "F" &&
            "Les mentions légales n'ont pas été détectées"),
      })
    );
    columns.push(
      getColumn({
        id: "declaration-rgpd-pc",
        title: "Politique de confidentialité",
        info: "Présence de la politique de confidentialité et conformité de celle-ci",
        hash: "declaration-rgpd",
        gradeKey: "declaration-rgpd-pc",
        category: "best-practices",
        gradeLabel: (rowData) => {
          switch (rowData.summary["declaration-rgpd-pc"]) {
            case "A":
              return "✔";
            case "D":
              return "";
            case "F":
              return "";
          }
        },
        warningText: (summary) =>
          (summary["declaration-rgpd-pc"] === "D" &&
            "La politique de confidentialité est présente mais incomplète. Consultez les détails pour plus d'informations") ||
          (summary["declaration-rgpd-pc"] === "F" &&
            "La politique de confidentialité n'a pas été trouvée"),
      })
    );
  }

  if (isToolEnabled("ecoindex")) {
    columns.push(
      getColumn({
        id: "ecoindex",
        title: "Eco-index",
        info: "Note éco-index",
        hash: "ecoindex",
        category: "best-practices",
        gradeKey: "ecoindexGrade",
      })
    );
  }

  if (isToolEnabled("lighthouse")) {
    columns = columns.concat([
      getColumn({
        id: "accessibility",
        title: "Tests auto accessibilité",
        info: "Bonnes pratiques en matière d'accessibilité web (LightHouse)",
        category: "best-practices",
        warning: <AccessibilityWarnings />,
        hash: "lighthouse",
        gradeKey: `lighthouse_accessibilityGrade`,
        sort: (a, b) => {
          if (a.summary[`lighthouse_accessibility`] === undefined) {
            return -1;
          }
          if (b.summary[`lighthouse_accessibility`] === undefined) {
            return 1;
          }
          return (
            parseFloat(a.summary[`lighthouse_accessibility`]) -
            parseFloat(b.summary[`lighthouse_accessibility`])
          );
        },
        getColorVariant: (rowData) => {
          const value =
            rowData.lhr && rowData.summary[`lighthouse_accessibility`];
          if (value >= 1) {
            return "success";
          } else if (value >= 0.85) {
            return "warning";
          } else if (value >= 0.7) {
            return "danger";
          } else {
            return "danger";
          }
        },
        gradeLabel: (rowData) => {
          const value =
            rowData.lhr && rowData.summary[`lighthouse_accessibility`];
          if (value >= 1) {
            return "✔";
          } else if (value >= 0.85) {
            return "B";
          } else if (value >= 0.7) {
            return "C";
          } else {
            return "⚠️";
          }
        },
      }),
      lightHouseColumn(
        "performance",
        "Performance",
        "Performances de chargement des pages web (LightHouse)"
      ),
      lightHouseColumn(
        "seo",
        "SEO",
        "Bonnes pratiques en matière de référencement naturel (LightHouse)"
      ),
    ]);
  }

  if (isToolEnabled("testssl")) {
    columns.push(
      getColumn({
        id: "ssl",
        title: "SSL",
        info: "Niveau de confiance du certificat SSL (testssl.sh)",
        hash: "testssl",
        gradeKey: "testsslGrade",
        gradeLabel: (rowData) => rowData.summary.testsslGrade,
        sort: sortSSLGrades,
        category: "securite",
        warningText: (summary) =>
          (summary.testsslExpireSoon &&
            summary.testsslExpireDate &&
            `Expire le : ${format(
              new Date(summary.testsslExpireDate),
              "dd/MM/yyyy"
            )}`) ||
          undefined,
      })
    );
  }

  if (isToolEnabled("http")) {
    columns.push(
      getColumn({
        id: "http",
        title: "HTTP",
        info: "Bonnes pratiques de configuration HTTP (Mozilla observatory)",
        hash: "http",
        category: "securite",
        gradeKey: "httpGrade",
      })
    );
  }

  if (isToolEnabled("updownio")) {
    columns = columns.concat([
      getColumn({
        id: "updownio",
        title: "Disponibilité",
        info: "Disponibilité du service (updown.io)",
        hash: "updownio",
        gradeKey: "uptimeGrade",
        category: "disponibilite",
        sort: (a, b) => {
          if (a.summary[`uptime`] === undefined) {
            return -1;
          }
          if (b.summary[`uptime`] === undefined) {
            return 1;
          }
          return a.summary[`uptime`] - b.summary[`uptime`];
        },
        gradeLabel: (rowData) =>
          rowData.summary.uptime !== undefined &&
          percent((rowData.summary.uptime || 0) / 100),
      }),
      getColumn({
        id: "updownio2",
        title: "Apdex",
        info: "Apdex: Application Performance Index : indice de satisfaction des attentes de performance (updown.io)",
        hash: "updownio",
        gradeKey: "apdexGrade",
        category: "disponibilite",
        gradeLabel: (rowData) => rowData.summary.apdex,
      }),
    ]);
  }

  if (isToolEnabled("dependabot")) {
    columns.push(
      getColumn({
        id: "dependabot",
        title: "Vulnérabilités",
        info: "Vulnérabilités applicatives detectées dans les dépendances du code (dependabot)",
        hash: "dependabot",
        category: "securite",
        gradeKey: "dependabotGrade",
        sort: (a, b) =>
          parseFloat(a.summary.dependabotCount || 0) -
          parseFloat(b.summary.dependabotCount || 0),
        gradeLabel: (rowData) => rowData.summary.dependabotCount,
      })
    );
  }

  if (isToolEnabled("codescan")) {
    columns.push(
      getColumn({
        id: "codescan",
        title: "CodeScan",
        info: "Potentielles vulnérabilités ou erreurs detectées dans les codes sources (codescan)",
        category: "securite",
        hash: "codescan",
        gradeKey: "codescanGrade",
        sort: (a, b) =>
          parseFloat(a.summary.codescanCount || 0) -
          parseFloat(b.summary.codescanCount || 0),
        gradeLabel: (rowData) => {
          const count = rowData.summary.codescanCount;
          if (count === 0) {
            return "✔";
          }
          return count;
        },
      })
    );
  }

  if (isToolEnabled("nmap")) {
    columns = columns.concat([
      getColumn({
        id: "nmap",
        title: "Nmap",
        info: "Vulnérabilités réseau detectées par Nmap",
        category: "securite",
        hash: "nmap",
        gradeKey: "nmapGrade",
      }),
      getColumn({
        id: "nmap2",
        title: "Ports ouverts",
        info: "Ports TCP ouverts détectés par nmap",
        category: "securite",
        sort: (a, b) => {
          if (a.summary[`nmapOpenPortsCount`] === undefined) {
            return -1;
          }
          if (b.summary[`nmapOpenPortsCount`] === undefined) {
            return 1;
          }
          return (
            a.summary[`nmapOpenPortsCount`] - b.summary[`nmapOpenPortsCount`]
          );
        },
        hash: "nmap",
        gradeKey: "nmapOpenPortsGrade",
        gradeLabel: (rowData) => rowData.summary.nmapOpenPortsCount,
      }),
    ]);
  }

  if (isToolEnabled("thirdparties")) {
    columns = columns.concat([
      getColumn({
        id: "trackers",
        title: "Trackers",
        info: "Nombre de scripts externes détectés",
        warning: (
          <div>
            Certains scripts externes légitimes peuvent être considérés comme
            trackers.
          </div>
        ),
        category: "best-practices",
        hash: "thirdparties",
        gradeKey: "trackersGrade",
        sort: (a, b) => {
          if (a.summary[`trackersCount`] === undefined) {
            return -1;
          }
          if (b.summary[`trackersCount`] === undefined) {
            return 1;
          }
          return a.summary[`trackersCount`] - b.summary[`trackersCount`];
        },
        gradeLabel: (rowData) => {
          const count = rowData.summary.trackersCount;
          if (count === 0) {
            return "✔";
          }
          return count;
        },
      }),
      getColumn({
        id: "cookies",
        title: "Cookies",
        info: "Nombre de cookies présents",
        category: "best-practices",
        hash: "thirdparties",
        gradeKey: "cookiesGrade",
        sort: (a, b) => {
          if (a.summary[`cookiesCount`] === undefined) {
            return -1;
          }
          if (b.summary[`cookiesCount`] === undefined) {
            return 1;
          }
          return a.summary[`cookiesCount`] - b.summary[`cookiesCount`];
        },
        gradeLabel: (rowData) => {
          const count = rowData.summary.cookiesCount;
          if (count === 0) {
            return "✔";
          }
          return count;
        },
      }),
    ]);
  }

  if (isToolEnabled("stats")) {
    columns.push(
      getColumn({
        id: "stats",
        category: "best-practices",
        title: "Stats",
        info: "Présence de la page des statistiques",
        hash: "stats",
        gradeKey: "statsGrade",
        gradeLabel: (rowData) => {
          const grade = rowData.summary.statsGrade;
          if (grade === "A") {
            return "✔";
          }
          return grade;
        },
      })
    );
  }

  if (isToolEnabled("budget_page")) {
    columns.push(
      getColumn({
        id: "budget_page",
        category: "best-practices",
        title: "Budget",
        info: "Présence de la page de budget",
        hash: "budget_page",
        gradeKey: "budgetPageGrade",
      })
    );
  }

  if (isToolEnabled("404")) {
    columns.push(
      getColumn({
        category: "best-practices",
        id: "404",
        title: "404",
        info: "Pages introuvables",
        hash: "404",
        gradeKey: "404",
        gradeLabel: (rowData) => {
          const count = rowData.summary["404"];
          //@ts-ignore
          if (count === 0 || count === "A+") {
            return "✔";
          }
          return count;
        },
      })
    );
  }

  if (isToolEnabled("trivy")) {
    columns.push(
      getColumn({
        id: "trivy",
        category: "securite",
        title: "Trivy",
        info: "Vulnérabilités Trivy",
        hash: "trivy",
        gradeKey: "trivyGrade",
      })
    );
  }

  if (isToolEnabled("sonarcloud")) {
    columns.push(
      getColumn({
        id: "sonarcloud",
        category: "securite",
        title: "SonarCloud",
        info: "Scan de code SonarCloud.io",
        hash: "sonarcloud",
        gradeKey: "sonarcloudGrade",
      })
    );
  }

  const filterBy = (key) => (item, idx, arr) =>
    !arr.slice(idx + 1).find((r) => item[key] === r[key]);
  return (
    (report && (
      <Table
        data={report.filter(filterBy("url"))}
        caption={""}
        columns={columns}
        rowKey={(row) => row.url}
        perPage={1000}
        tableClassName={styles.table}
        className={styles.tableWrapper}
        fixedHeader={true}
      />
    )) ||
    null
  );
};
