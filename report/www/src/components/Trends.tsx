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
      const values = urlTrends[key].map(({ date, value }) => value) as any[];
      if (values.length > 1) {
        // keep only first and last
        const firstValue = values[0];
        const lastValue = values[values.length - 1];
        // @ts-ignore
        const treshold = metricsDefinitions[key].treshold;
        const isValid = treshold
          ? Math.abs(firstValue - lastValue) > (treshold || 0)
          : true;
        if (isValid && firstValue !== lastValue) {
          changes[key] = [firstValue, lastValue];
        }
      }
    });
  return changes;
};

const metricsDefinitions = {
  testsslGrade: { title: "SSL" },
  codescanGrade: { title: "Codescan grade" },
  dependabotGrade: { title: "Dependabot grade" },
  httpGrade: { title: "HTTP observatory" },
  lighthouse_performance: { treshold: 0.1, title: "Lighthouse Performance" },
  lighthouse_seo: { treshold: 0.1, title: "Lighthouse SEO" },
  lighthouse_pwa: { treshold: 0.1, title: "Lighthouse PWA" },
  lighthouse_accessibility: { title: "Lighthouse accessibility" },
  "lighthouse_best-practices": {
    treshold: 0.1,
    title: "Lighthouse best practices",
  },
  nmapGrade: { title: "NMAP grade" },
  nmapOpenPortsGrade: { title: "NMAP open ports grade" },
  trackersCount: { title: "Trackers count", reverse: true },
  cookiesCount: { title: "Cookies count", reverse: true },
  uptime: { treshold: 1, title: "uptime" },
  apdex: { treshold: 0.05, title: "apDex" },
  "declaration-a11y": { title: "Déclaration a11y" },
  trivyGrade: { title: "Trivy grade" },
} as Record<
  keyof UrlReportSummary,
  { title: string; reverse?: boolean; treshold?: number }
>;

const getTrend = (metric: SummaryKey, values: any[]) => {
  const metricDefinition = metricsDefinitions[metric];
  const firstValue = values[0];
  const lastValue = values[values.length - 1];
  if (metric.match(/Grade$/) || metric === "declaration-a11y") {
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
    .filter((n, i, arr) => i === 0 || i === arr.length - 1)
    .join(" => ");

const columns = [
  {
    name: "trend",
    label: "Trend",
    render: (row: any) => {
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
    //@ts-ignore
    render: (row) => metricsDefinitions[row.key].title,
  },
  {
    name: "evolution",
    label: "Evolution",
    //@ts-ignore
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
