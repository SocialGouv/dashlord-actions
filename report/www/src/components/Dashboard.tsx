import * as React from "react";
import { useState, useMemo } from "react";
import { Slash, Info, Search, AlertTriangle } from "react-feather";
import { Link } from "react-router-dom";
import Tooltip from "rc-tooltip";
import orderBy from "lodash.orderby";

import BaseTable, { AutoResizer, Column, SortOrder } from "react-base-table";

import { Grade } from "./Grade";
import { smallUrl, isToolEnabled, letterGradeValue } from "../utils";
import { getPerformanceScore } from "../lib/lighthouse/getPerformanceScore";
import { AccessibilityWarnings } from "../lib/lighthouse/AccessibilityWarnings";
import { apdexToGrade } from "./UpdownIo";

import "react-base-table/styles.css";
import "rc-tooltip/assets/bootstrap.css";

type DashboardProps = { report: DashLordReport };

const remap = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

const scoreToGrade = (score: number) => {
  const grades = "A,B,C,D,E,F".split(",");

  const newGrade = Math.min(
    grades.length - 1,
    Math.floor(remap(score, 0, 1, 0, 6))
  );

  return grades[newGrade];
};

const IconUnknown = () => <Slash size={20} />;

const getGradeTrackers = (count: number) => {
  return count > 10 ? "F" : count > 2 ? "C" : count > 0 ? "B" : "A";
};

const getGradeCookies = (count: number) => {
  return count > 10
    ? "F"
    : count > 5
    ? "E"
    : count > 2
    ? "C"
    : count > 0
    ? "B"
    : "A";
};

const getGradeUpdownio = (uptime: number) => {
  return uptime > 0.99
    ? "A"
    : uptime > 0.98
    ? "B"
    : uptime > 0.97
    ? "C"
    : uptime > 0.96
    ? "D"
    : uptime > 0.95
    ? "E"
    : "F";
};

const getDependabotNodeGrade = (nodes: DependabotNode[]) => {
  return nodes.filter(
    (a) =>
      a.securityVulnerability.severity === "CRITICAL" ||
      a.securityVulnerability.severity === "HIGH"
  ).length
    ? "F"
    : nodes.length
    ? "B"
    : "A";
};

type ColumnHeaderProps = {
  title: string;
  info: string;
  warning?: React.ReactNode;
};

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  title,
  info,
  warning,
}) => (
  <div style={{ textAlign: "center" }}>
    <span style={{ fontSize: "0.9em" }}>
      {title}
      <br />
      <Tooltip
        placement="bottom"
        trigger={["hover"]}
        overlay={<div style={{ maxWidth: 300 }}>{info}</div>}
      >
        <Info size={16} style={{ cursor: "pointer" }} />
      </Tooltip>
    </span>

    {warning && (
      <Tooltip
        placement="bottom"
        trigger={["hover"]}
        overlay={<div style={{ maxWidth: 300 }}>{warning}</div>}
      >
        <AlertTriangle
          size={16}
          style={{
            stroke: "var(--danger)",
            marginLeft: 5,
            cursor: "pointer",
          }}
        />
      </Tooltip>
    )}
  </div>
);

type BadgeProps = { report: UrlReport };
type LightHouseBadgeProps = BadgeProps & {
  category: LighthouseReportCategoryKey;
};

const LightHouseBadge: React.FC<LightHouseBadgeProps> = ({
  report,
  category,
}) => {
  const lhrCategories = report.lhr && report.lhr.categories;
  if (!report.lhr || !lhrCategories) {
    return <IconUnknown />;
  }
  // use custom scoring
  lhrCategories["performance"].score = getPerformanceScore(report.lhr);

  const value =
    lhrCategories &&
    lhrCategories[category] &&
    (lhrCategories[category].score as number);
  return (
    <Grade
      small
      grade={scoreToGrade(1 - value)}
      label={(value * 100).toFixed() + " %"}
    />
  );
};

const SSLBadge: React.FC<BadgeProps> = ({ report }) => {
  const overallGrade =
    report.testssl &&
    report.testssl.find((entry) => entry.id === "overall_grade");
  const value = overallGrade && overallGrade.finding;
  if (!value) {
    return <IconUnknown />;
  }
  return <Grade small grade={value} />;
};

const HTTPBadge: React.FC<BadgeProps> = ({ report }) => {
  const value = report.http && report.http.grade;
  if (!value) {
    return <IconUnknown />;
  }
  return <Grade small grade={value} />;
};

const ThirdPartiesTrackersBadge: React.FC<BadgeProps> = ({ report }) => {
  if (!report.thirdparties) {
    return <IconUnknown />;
  }
  const trackersCount =
    (report.thirdparties &&
      report.thirdparties.trackers &&
      report.thirdparties.trackers.length) ||
    0;
  const trackersGrade = getGradeTrackers(trackersCount);
  return <Grade small grade={trackersGrade} label={trackersCount} />;
};

const ThirdPartiesCookiesBadge: React.FC<BadgeProps> = ({ report }) => {
  if (!report.thirdparties) {
    return <IconUnknown />;
  }
  const cookiesCount =
    (report.thirdparties &&
      report.thirdparties.cookies &&
      report.thirdparties.cookies.length) ||
    0;
  const cookiesGrade = getGradeCookies(cookiesCount);
  return <Grade small grade={cookiesGrade} label={cookiesCount} />;
};

const getNmapOpenPortGrade = (vulnerabilities: NmapVulnerability[]) => {
  return vulnerabilities.filter(
    (a) =>
      a.is_exploit &&
      Number.parseFloat(a.cvss) > 7
  ).length
    ? "F"
    : vulnerabilities.length
    ? "B"
    : "A";
};

const NmapBadge: React.FC<BadgeProps> = ({ report }) => {
  if (!report.nmap) {
    return <IconUnknown />;
  }

  // nmap
  const nmapCount =
    report.nmap &&
    report.nmap.open_ports ?
    report.nmap.open_ports
      .filter(Boolean)
      .map((port) => port.service.vulnerabilities.length)
      .reduce((prev, curr) => prev + curr, 0) : 0;
  const maxGrade = (a: "F" | "B" | "A", b: "F" | "B" | "A") => {
    const grades = new Map();
    grades.set("F", 3);
    grades.set("B", 2);
    grades.set("A", 1);
    const orders = new Map();
    orders.set(3, "F");
    orders.set(2, "B");
    orders.set(1, "A");
    return orders.get(Math.max(grades.get(a), grades.get(b)));
  };
  const grades =
    report.nmap &&
    report.nmap.open_ports ?
    report.nmap.open_ports
      .filter(Boolean)
      .map((port) => getNmapOpenPortGrade(port.service.vulnerabilities)) : [];

  if (!grades.length) {
    return <IconUnknown />;
  }

  const nmapGrade = grades.reduce(maxGrade);
  return <Grade small grade={nmapGrade} label={nmapCount} />;
};

const DependabotBadge: React.FC<BadgeProps> = ({ report }) => {
  if (!report.dependabot) {
    return <IconUnknown />;
  }

  // dependabot
  const dependabotCount =
    report.dependabot &&
    report.dependabot
      .filter(Boolean)
      .map((repo) => repo.vulnerabilityAlerts.totalCount)
      .reduce((prev, curr) => prev + curr, 0);
  const maxGrade = (a: "F" | "B" | "A", b: "F" | "B" | "A") => {
    const grades = new Map();
    grades.set("F", 3);
    grades.set("B", 2);
    grades.set("A", 1);
    const orders = new Map();
    orders.set(3, "F");
    orders.set(2, "B");
    orders.set(1, "A");
    return orders.get(Math.max(grades.get(a), grades.get(b)));
  };
  const grades =
    report.dependabot &&
    report.dependabot
      .filter(Boolean)
      .map((repo) => getDependabotNodeGrade(repo.vulnerabilityAlerts.nodes));

  if (!grades.length) {
    return <IconUnknown />;
  }

  const dependabotGrade = grades.reduce(maxGrade);
  return <Grade small grade={dependabotGrade} label={dependabotCount} />;
};

const getCodescanAlertGrade = (alerts: CodescanAlert[]) => {
  return alerts.filter((a) => a.rule.severity === "error").length
    ? "F"
    : alerts.length
    ? "B"
    : "A";
};

const CodescanBadge: React.FC<BadgeProps> = ({ report }) => {
  if (!report.codescan) {
    return <IconUnknown />;
  }

  // codescan
  const codescanCount =
    report.codescan &&
    report.codescan
      .filter(Boolean)
      .map((repo) => (repo ? (repo.alerts ? repo.alerts.length : 0) : 0))
      .reduce((prev, curr) => prev + curr, 0);
  const maxGrade = (a: "F" | "B" | "A", b: "F" | "B" | "A") => {
    const grades = new Map();
    grades.set("F", 3);
    grades.set("B", 2);
    grades.set("A", 1);
    const orders = new Map();
    orders.set(3, "F");
    orders.set(2, "B");
    orders.set(1, "A");
    return orders.get(Math.max(grades.get(a), grades.get(b)));
  };
  const grades =
    report.codescan &&
    report.codescan
      .filter(Boolean)
      .map((repo) =>
        repo ? (repo.alerts ? getCodescanAlertGrade(repo.alerts) : "A") : "A"
      );

  if (!grades.length) {
    return <IconUnknown />;
  }

  const codescanGrade = grades.reduce(maxGrade);
  return <Grade small grade={codescanGrade} label={codescanCount} />;
};

const UpDownIoUptimeBadge: React.FC<BadgeProps> = ({ report }) => {
  if (!report.updownio) {
    return <IconUnknown />;
  }
  const updownio = report.updownio && report.updownio.uptime;
  const updownioGrade = getGradeUpdownio(updownio);
  return (
    <Grade small grade={updownioGrade} label={updownio.toFixed() + " %"} />
  );
};

const UpDownIoApDexBadge: React.FC<BadgeProps> = ({ report }) => {
  const apdex =
    report.updownio && report.updownio.metrics && report.updownio.metrics.apdex;
  if (apdex === undefined || apdex === null) {
    return <IconUnknown />;
  }

  const updownioGrade = apdexToGrade(apdex);
  return <Grade small grade={updownioGrade} label={apdex} />;
};

type SortState = {
  key: string;
  order: SortOrder;
  column: { [column: string]: string };
};

const defaultSort = {
  key: "url",
  order: "asc",
  column: { dataKey: "url" },
} as SortState;

export const Dashboard: React.FC<DashboardProps> = ({ report }) => {
  const [sortBy, setSortBy] = useState(defaultSort);

  const onColumnSort = (column: any) => {
    setSortBy(column);
  };

  const sortedReport = useMemo(() => {
    const getSortedRows = (rows: any) => {
      return orderBy(
        rows,
        (row) => {
          if (sortBy.column.dataGetter) {
            //@ts-expect-error
            return sortBy.column.dataGetter({ rowData: row });
          } else if (sortBy.column.key) {
            return row[sortBy.column.key];
          }
        },
        sortBy.order
      );
    };

    return getSortedRows(report);
  }, [sortBy, report]);

  const defaultColumnProps = {
    width: 120,
    sortable: true,
    align: "center",
  } as {
    width: number;
    sortable: boolean;
    align: "center" | "left" | "right";
  };

  return (
    <div style={{ width: "100%", height: "calc(100vh - 30px)" }}>
      <AutoResizer>
        {({ width, height }) => (
          <BaseTable
            data={sortedReport}
            width={width}
            height={height}
            sortBy={sortBy}
            onColumnSort={onColumnSort}
          >
            <Column
              key="url"
              title="url"
              sortable={true}
              width={300}
              flexGrow={1}
              cellRenderer={({ rowData }) => (
                <Link
                  to={`/url/${encodeURIComponent((rowData as UrlReport).url)}`}
                >
                  <Search size={16} />
                  &nbsp;{smallUrl((rowData as UrlReport).url)}
                </Link>
              )}
            />
            {isToolEnabled("lighthouse") && (
              <Column
                {...defaultColumnProps}
                key="accessibility"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  return (
                    (report &&
                      report.lhr &&
                      report.lhr.categories.accessibility.score) ||
                    0
                  );
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="Accessibilité"
                    info="Bonnes pratiques en matière d'accessibilité web (LightHouse)"
                    warning={<AccessibilityWarnings />}
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <LightHouseBadge
                    report={rowData as UrlReport}
                    category="accessibility"
                  />
                )}
              />
            )}

            {isToolEnabled("lighthouse") && (
              <Column
                {...defaultColumnProps}
                key="performance"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  return (report.lhr && getPerformanceScore(report.lhr)) || 0;
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="Performance"
                    info="Performances de chargement des pages web (LightHouse)"
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <LightHouseBadge
                    report={rowData as UrlReport}
                    category="performance"
                  />
                )}
              />
            )}

            {isToolEnabled("lighthouse") && (
              <Column
                {...defaultColumnProps}
                key="seo"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  return (
                    (report && report.lhr && report.lhr.categories.seo.score) ||
                    0
                  );
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="SEO"
                    info="Bonnes pratiques en matière de référencement naturel (LightHouse)"
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <LightHouseBadge
                    report={rowData as UrlReport}
                    category="seo"
                  />
                )}
              />
            )}

            {isToolEnabled("testssl") && (
              <Column
                {...defaultColumnProps}
                key="ssl"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  const overallGrade =
                    report.testssl &&
                    report.testssl.find(
                      (entry) => entry.id === "overall_grade"
                    );
                  return overallGrade && letterGradeValue(overallGrade.finding);
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="SSL"
                    info="Niveau de confiance du certificat SSL (testssl.sh)"
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <SSLBadge report={rowData as UrlReport} />
                )}
              />
            )}

            {isToolEnabled("http") && (
              <Column
                {...defaultColumnProps}
                key="http"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  return report.http && letterGradeValue(report.http.grade);
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="HTTP"
                    info="Bonnes pratiques de configuration HTTP (Mozilla observatory)"
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <HTTPBadge report={rowData as UrlReport} />
                )}
              />
            )}

            {isToolEnabled("updownio") && (
              <Column
                {...defaultColumnProps}
                key="updownio"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  return report.updownio && report.updownio.uptime;
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="Disponibilité"
                    info="Disponibilité du service (updown.io)"
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <UpDownIoUptimeBadge report={rowData as UrlReport} />
                )}
              />
            )}

            {isToolEnabled("updownio") && (
              <Column
                {...defaultColumnProps}
                key="updownio2"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  return (
                    report.updownio &&
                    report.updownio.metrics &&
                    report.updownio.metrics.apdex
                  );
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="apdex"
                    info="Apdex: Application Performance Index : indice de satisfaction des attentes de performance (updown.io)"
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <UpDownIoApDexBadge report={rowData as UrlReport} />
                )}
              />
            )}

            {isToolEnabled("dependabot") && (
              <Column
                {...defaultColumnProps}
                key="dependabot"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  const dependabotCount =
                    report.dependabot &&
                    report.dependabot
                      .filter(Boolean)
                      .map((repo) => repo.vulnerabilityAlerts.totalCount)
                      .reduce((prev, curr) => prev + curr, 0);
                  return dependabotCount;
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="Vulnérabilités"
                    info="Vulnérabilités applicatives detectées dans les dépendances du code (dependabot)"
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <DependabotBadge report={rowData as UrlReport} />
                )}
              />
            )}


            {isToolEnabled("nmap") && (
              <Column
                {...defaultColumnProps}
                key="nmap"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  const nmapCount =
                    report.nmap &&
                    report.nmap.open_ports &&
                    report.nmap.open_ports
                      .filter(Boolean)
                      .map((port) => port.service.vulnerabilities.length)
                      .reduce((prev, curr) => prev + curr, 0);
                  return nmapCount;
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="Nmap"
                    info="Vulnérabilités réseau detectées par Nmap"
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <NmapBadge report={rowData as UrlReport} />
                )}
              />
            )}

            {isToolEnabled("codescan") && (
              <Column
                {...defaultColumnProps}
                key="codescan"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  const codescanCount =
                    report.codescan &&
                    report.codescan
                      .filter(Boolean)
                      .map((repo) =>
                        repo ? (repo.alerts ? repo.alerts.length : 0) : 0
                      )
                      .reduce((prev, curr) => prev + curr, 0);
                  return codescanCount;
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="CodeQL"
                    info="Potentielles vulnérabilités ou erreurs detectées dans les codes sources (codescan)"
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <CodescanBadge report={rowData as UrlReport} />
                )}
              />
            )}

            {isToolEnabled("thirdparties") && (
              <Column
                {...defaultColumnProps}
                key="trackers"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  return (
                    report.thirdparties && report.thirdparties.trackers.length
                  );
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="Trackers"
                    info="Nombre de scripts externes détectés"
                    warning={
                      <div>
                        Certains scripts externes légitimes peuvent être
                        considérés comme trackers.
                      </div>
                    }
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <ThirdPartiesTrackersBadge report={rowData as UrlReport} />
                )}
              />
            )}

            {isToolEnabled("thirdparties") && (
              <Column
                {...defaultColumnProps}
                key="cookies"
                dataGetter={({ rowData }) => {
                  const report = rowData as UrlReport;
                  return (
                    report.thirdparties && report.thirdparties.cookies.length
                  );
                }}
                headerRenderer={() => (
                  <ColumnHeader
                    title="Cookies"
                    info="Nombre de cookies présents"
                  />
                )}
                cellRenderer={({ rowData }) => (
                  <ThirdPartiesCookiesBadge report={rowData as UrlReport} />
                )}
              />
            )}
          </BaseTable>
        )}
      </AutoResizer>
    </div>
  );
};
