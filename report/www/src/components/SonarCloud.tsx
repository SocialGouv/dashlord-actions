import * as React from "react";

import { Table } from "@dataesr/react-dsfr";

import { Panel } from "./Panel";
import { Grade } from "./Grade";

type SonarCloudReportProps = { data: SonarCloudReport };

const columns = [
  {
    name: "badge",
    label: "Score",
    render: (result) => {
      if (result.name === "qualityGateStatus") {
        if (result.value === "ERROR") {
          return <Grade grade="F" />;
        }
        return;
      }
      if (result.name === "vulnerabilities") {
        if (result.value > 10) {
          return <Grade grade="F" />;
        } else if (result.value > 5) {
          return <Grade grade="C" />;
        } else if (result.value > 1) {
          return <Grade grade="B" />;
        }
        return <Grade grade="A" />;
      }
      if (result.value > 100) {
        return <Grade grade="F" />;
      } else if (result.value > 50) {
        return <Grade grade="D" />;
      } else if (result.value > 0) {
        return <Grade grade="B" />;
      }
      return <Grade grade="A" />;
    },
  },
  {
    name: "name",
    label: "Indicateur",
  },
  {
    name: "value",
    label: "Résultat",
  },
];

export const SonarCloud: React.FC<SonarCloudReportProps> = ({ data }) => (
  <>
    {(data &&
      data.length &&
      data.map((report) => {
        const repoData = Object.entries(report.result.status).map(
          ([key, value]) => ({ name: key, value }),
          []
        );
        return (
          <Panel
            key={report.repo}
            title={`Qualimétrie SonarCloud ${report.repo}`}
            url={`https://sonarcloud.io/project/overview?id=${report.repo.replace(
              "/",
              "_"
            )}`}
            urlText="Rapport détaillé"
            isExternal
          >
            <Table columns={columns} data={repoData} rowKey="repo" />
          </Panel>
        );
      })) ||
      null}
  </>
);
