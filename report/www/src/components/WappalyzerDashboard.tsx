import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Jumbotron, CardColumns } from "react-bootstrap";
import uniq from "lodash.uniq";

import { Link } from "react-router-dom";

import { Panel } from "./Panel";

type UsageChartProps = { data: any };

const UsageChart: React.FC<UsageChartProps> = ({ data }) => {
  return (
      <BarChart
        width={300}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
  );
};

const toChartData = (category: WappalyzerParsedCategory) =>
  category.items.map((item) => ({
    name: item.name,
    count: item.urls.length,
  }));

type WappalyzerDashboardProps = { report: DashLordReport };

type WappalyzerParsedCategory = {
  name: string;
  items: {
    name: string;
    website: string | undefined;
    urls: string[];
  }[];
};

const getCategoriesByUrl = (report: DashLordReport) => {
  const allTechnologies = report
    .flatMap((url) => ({ url, wappalyzer: url.wappalyzer }))
    .filter(({ url, wappalyzer }) => !!wappalyzer)
    .flatMap(
      ({ url, wappalyzer }) =>
        (wappalyzer &&
          wappalyzer.technologies.map((details) => ({
            ...details,
            url: url.url,
          }))) ||
        []
    );
  const categoriesNames = uniq(
    allTechnologies.flatMap(
      (t) => t.categories && t.categories.map((c) => c.name)
    )
  );

  const getTechUrl = (name: string) =>
    allTechnologies.find((t) => t.name === name)?.website;

  const categories = categoriesNames.map((name) => {
    const categoryTechs = allTechnologies.filter(
      (t) => t.categories && t.categories.find((c) => c.name === name)
    );

    // group techs by name and sort by count desc
    const byTech = categoryTechs.reduce((a, t) => {
      if (!a[t.name]) {
        a[t.name] = [];
      }
      a[t.name].push(t.url);
      return a;
    }, {} as Record<string, any>);

    const sortedTechs = Object.keys(byTech)
      .map((name) => ({
        name,
        website: getTechUrl(name),
        urls: byTech[name] as string[],
      }))
      .sort((a, b) => a.urls.length - b.urls.length)
      .reverse();

    return {
      name,
      items: sortedTechs,
    };
  });

  return categories;
};

export const WappalyzerDashboard = ({ report }: WappalyzerDashboardProps) => {
  const categories = getCategoriesByUrl(report);
  return (
    <div>
      <br />
      <Jumbotron style={{ padding: "2em" }}>
        <h1>Wappalyzer : technologies détectées</h1>
      </Jumbotron>
      <CardColumns>
        {categories.map((category) => (
          <Panel key={category.name} title={category.name}>
            <UsageChart data={toChartData(category)} />
            <br/>
            {category.items.map((item) => (
              <div key={item.name}>
                <b>
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name} ({item.urls.length})
                  </a>
                </b>
                <ul>
                  {item.urls.map((url) => (
                    <li key={url}>
                      <Link to={`/url/${url}`}>{url}</Link>
                    </li>
                  ))}
                </ul>
                <br />
              </div>
            ))}
          </Panel>
        ))}
      </CardColumns>
    </div>
  );
};
