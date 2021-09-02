import React from "react";
import { TrendingUp, TrendingDown } from "react-feather";
import { Table } from "@dataesr/react-dsfr";
import { Panel } from "./Panel";
import { smallUrl, letterGradeValue } from "../utils";

const uniqify = (arr: any[]): any[] => Array.from(new Set(arr));

type ChangeSet = Record<string, any[]>;
type SummaryKey = keyof UrlReportSummary;

const getChanges = (urlTrends: UrlMetricsHistoryValues): ChangeSet => {
  const changes = {} as ChangeSet;
  Object.keys(urlTrends)
    .filter((key) => key in metricsDefinitions)
    .forEach((key) => {
      const values = urlTrends[key].map(({ date, value }) => value);

      const uniqueValues = uniqify(values);
      if (uniqueValues.length > 1) {
        changes[key] = uniqueValues;
      }
    });
  return changes;
};

const metricsDefinitions = {
  testsslGrade: { title: "SSL" },
  codescanGrade: { title: "Codescan grade" },
  dependabotGrade: { title: "Dependabot grade" },
  httpGrade: { title: "HTTP observatory" },
  lighthouse_performance: { title: "Performance" },
  lighthouse_seo: { title: "Lighthouse SEO" },
  lighthouse_pwa: { title: "Lighthouse PWA" },
  lighthouse_accessibility: { title: "Lighthouse accessibility" },
  "lighthouse_best-practices": { title: "Lighthouse best practices" },
  nmapGrade: { title: "NMAP grade" },
  nmapOpenPortsGrade: { title: "NMAP open ports grade" },
  trackersCount: { title: "Trackers count", reverse: true },
  cookiesCount: { title: "Cookies count", reverse: true },
  uptime: { title: "uptime" },
  apdex: { title: "apDex" },
} as Record<any, { title: string; reverse?: boolean }>;

const getTrend = (metric: SummaryKey, values: any[]) => {
  const metricDefinition = metricsDefinitions[metric];
  const firstValue = values[0];
  const lastValue = values[values.length - 1];
  if (metric.match(/Grade$/)) {
    return letterGradeValue(lastValue) - letterGradeValue(firstValue);
  }
  if (metricDefinition.reverse) {
    return firstValue - lastValue;
  }
  return lastValue - firstValue;
};

const showValues = (values: any[]) =>
  values
    .map((val: any) => {
      if (!isNaN(val)) {
        return Math.floor(val * 10000) / 10000;
      }
      return val;
    })
    .join(" => ");

const columns = [
  {
    name: "trend",
    label: "Trend",
    render: (row) => {
      const trend = getTrend(row.key, row.values);
      return trend > 0 ? (
        <TrendingUp
          size={40}
          style={{
            stroke: "var(--success)",
            marginRight: 10,
          }}
        />
      ) : (
        <TrendingDown
          size={40}
          style={{
            stroke: "var(--error)",
            marginRight: 10,
          }}
        />
      );
    },
  },
  {
    name: "outil",
    label: "Outil",
    render: (row) => metricsDefinitions[row.key].title,
  },
  {
    name: "evolution",
    label: "Evolution",
    render: (row) => showValues(row.values),
  },
];

export const Trends = ({ trends }: { trends: Trends }) => {
  const urls = Object.keys(trends);
  urls.sort();
  return (
    <div>
      <br />
      <h3>Evolutions sur les 30 derniers jours</h3>
      <br />

      {urls.map((url) => {
        const changes = getChanges(trends[url]);
        if (Object.keys(changes).length) {
          return (
            <Panel
              key={url}
              title={smallUrl(url)}
              url={`/url/${encodeURIComponent(url)}`}
            >
              <Table
                caption=""
                columns={columns}
                data={Object.keys(changes).map((change) => ({
                  key: change,
                  values: changes[change],
                }))}
                rowKey="key"
              />
            </Panel>
          );
        }
        return null;
      })}
    </div>
  );
};
