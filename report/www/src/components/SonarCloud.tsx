import * as React from "react";

import Table from "@codegouvfr/react-dsfr/Table";

import { Panel } from "./Panel";
import { GradeBadge } from "./GradeBadge";

type SonarCloudReportProps = { data: SonarCloudReport };

const columns = [
  {
    name: "badge",
    label: "Score",
    render: (result) => {
      if (result.name === "qualityGateStatus") {
        if (result.value === "ERROR") {
          return <GradeBadge label="F" />;
        } else if (result.value === "OK") {
          return <GradeBadge label="A" />;
        }
        return;
      }
      if (result.name === "vulnerabilities") {
        if (result.value > 10) {
          return <GradeBadge label="F" />;
        } else if (result.value > 5) {
          return <GradeBadge label="C" />;
        } else if (result.value > 1) {
          return <GradeBadge label="B" />;
        }
        return <GradeBadge label="A" />;
      }
      if (result.value > 100) {
        return <GradeBadge label="F" />;
      } else if (result.value > 50) {
        return <GradeBadge label="D" />;
      } else if (result.value > 0) {
        return <GradeBadge label="B" />;
      }
      return <GradeBadge label="A" />;
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
        const tableData = [
          columns.map((col) => col.name),
          ...repoData.map((repo) => {
            return columns.map((col) =>
              col.render ? col.render(repo) : repo[col.name]
            );
          }),
        ];
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
            <Table data={tableData} />
          </Panel>
        );
      })) ||
      null}
  </>
);
