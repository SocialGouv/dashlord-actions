import { Panel } from "./Panel";
import { TrendingUp, TrendingDown } from "react-feather";
import { smallUrl, letterGradeValue } from "../utils";
import { Table } from "react-bootstrap";

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
  } else if (metricDefinition.reverse) {
    return firstValue - lastValue;
  } else {
    return lastValue - firstValue;
  }
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

const Trend = ({ metric, values }: { metric: SummaryKey; values: any[] }) => {
  const showMetric = metric in metricsDefinitions;
  if (!showMetric) {
    return null;
  }
  const trend = getTrend(metric, values);
  const Icon = () =>
    trend > 0 ? (
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
          stroke: "var(--danger)",
          marginRight: 10,
        }}
      />
    );
  return (
    <tr>
      <td className="text-center">
        <Icon />
      </td>
      <td>{metricsDefinitions[metric].title}</td>
      <td>{showValues(values)}</td>
    </tr>
  );
};

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
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: 100 }} className="text-center">
                      Trend
                    </th>
                    <th>Outil</th>
                    <th>Evolution</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(changes).map((key) => (
                    <Trend
                      key={key}
                      metric={key as SummaryKey}
                      values={changes[key]}
                    />
                  ))}
                </tbody>
              </Table>
            </Panel>
          );
        }
        return null;
      })}
    </div>
  );
};

/*
<Table striped bordered hover>
  <thead>
    <tr>
      <th style={{ width: 100 }} className="text-center">
        Trend
      </th>
      <th>Outil</th>
      <th>Evolution</th>
    </tr>
  </thead>
  <tbody>
    {nodes.map((node, i: number) => {
      return (
        <tr key={node.securityVulnerability.package.name + i}>
          <td className="text-center">
            <DependabotBadge {...node} />
          </td>
          <td>{node.securityVulnerability.package.name}</td>
          <td>
            {node.securityVulnerability.advisory.references.map(
              (reference, i: number) => {
                return (
                  <p key={getLastUrlSegment(reference.url) + i}>
                    <a
                      target="_blank"
                      href={reference.url}
                      rel="noopener noreferrer"
                    >
                      {getLastUrlSegment(reference.url)}
                    </a>
                    <br />
                  </p>
                );
              }
            )}
          </td>
        </tr>
      );
    })}
  </tbody>
</Table>;
*/
