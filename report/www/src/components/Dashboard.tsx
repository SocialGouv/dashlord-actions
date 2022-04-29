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

type DashboardProps = { report: DashLordReport };

import styles from "./dashboard.module.scss";

const IconUnknown = () => <Slash size={20} />;

const percent = (num: number | undefined): string =>
  (num !== undefined && `${Math.floor(num * 100)} %`) || "-";

const GradeBadge = ({
  grade,
  label,
  warning,
  to,
}: {
  grade: string | undefined;
  label?: string | number | undefined;
  warning?: string;
  to?: string;
}) => (
  <div style={{ textAlign: "center" }}>
    {grade ? (
      <Grade small warning={warning} grade={grade} label={label} to={to} />
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
  gradeLabel?: (s: UrlReportSummary) => string | number | undefined;
  warningText?: (s: UrlReportSummary) => string | undefined;
};

export const Dashboard: React.FC<DashboardProps> = ({ report }) => {
  const getSummaryData = (rowData, grade) => {
    const { summary } = rowData as UrlReport;
    return (summary[grade] && letterGradeValue(summary[grade])) || -1;
  };

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
          grade={summary[gradeKey]}
          label={gradeLabel && gradeLabel(summary)}
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
      gradeLabel: (summary) => percent(summary[`lighthouse_${id}`]),
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

  if (isToolEnabled("declaration-a11y")) {
    columns.push(
      getColumn({
        id: "declaration-a11y",
        title: "Déclaration d'accessibilité",
        info: "Présence de la mention de conformité et de la déclaration",
        hash: "declaration-a11y",
        gradeKey: "declaration-a11y",
        category: "best-practices",
        //gradeLabel: (summary) => summary.statsCount,
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
        gradeLabel: (summary) => {
          switch (summary["declaration-rgpd-ml"]) {
            case "A":
              return "🥳";
            case "D":
              return "";
            case "F":
              return "😔";
          }
        },
        warningText: (summary) =>
          summary["declaration-rgpd-ml"] === "D" &&
          "Vos mentions légales sont présentes mais incomplètes. Consultez les détails pour plus d'informations",
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
        gradeLabel: (summary) => {
          switch (summary["declaration-rgpd-pc"]) {
            case "A":
              return "🥳";
            case "D":
              return "";
            case "F":
              return "😔";
          }
        },
        warningText: (summary) =>
          summary["declaration-rgpd-pc"] === "D" &&
          "Votre politique de confidentialité est présente mais incomplète. Consultez les détails pour plus d'informations",
      })
    );
  }

  if (isToolEnabled("lighthouse")) {
    columns = columns.concat([
      lightHouseColumn(
        "accessibility",
        "Accessibilité",
        "Bonnes pratiques en matière d'accessibilité web (LightHouse)"
      ),
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
        gradeLabel: (summary) => summary.testsslGrade,
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
        gradeLabel: (summary) => percent((summary.uptime || 0) / 100),
      }),
      getColumn({
        id: "updownio2",
        title: "Apdex",
        info: "Apdex: Application Performance Index : indice de satisfaction des attentes de performance (updown.io)",
        hash: "updownio",
        gradeKey: "apdexGrade",
        category: "disponibilite",
        gradeLabel: (summary) => summary.apdex,
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
        gradeLabel: (summary) => summary.dependabotCount,
      })
    );
  }

  if (isToolEnabled("codescan")) {
    columns.push(
      getColumn({
        id: "codescan",
        title: "CodeQL",
        info: "Potentielles vulnérabilités ou erreurs detectées dans les codes sources (codescan)",
        category: "securite",
        hash: "codescan",
        gradeKey: "codescanGrade",
        gradeLabel: (summary) => summary.codescanCount,
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
        hash: "nmap",
        gradeKey: "nmapOpenPortsGrade",
        gradeLabel: (summary) => summary.nmapOpenPortsCount,
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
        gradeLabel: (summary) => summary.trackersCount,
      }),
      getColumn({
        id: "cookies",
        title: "Cookies",
        info: "Nombre de cookies présents",
        category: "best-practices",
        hash: "thirdparties",
        gradeKey: "cookiesGrade",
        gradeLabel: (summary) => summary.cookiesCount,
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
        gradeLabel: (summary) => summary.statsCount,
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
        gradeLabel: (summary) => {
          return summary["404"];
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

  const filterBy = (key) => (item, idx, arr) =>
    !arr.slice(idx + 1).find((r) => item[key] === r[key]);
  return (
    (report && (
      <Table
        data={report.filter(filterBy("url"))}
        caption={""}
        columns={columns}
        rowKey={row => row.url}
        perPage={1000}
        tableClassName={styles.table}
        className={styles.tableWrapper}
      />
    )) ||
    null
  );
};
