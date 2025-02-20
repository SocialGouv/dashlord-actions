import * as React from "react";
import Table from "@codegouvfr/react-dsfr/Table";
import Badge from "@codegouvfr/react-dsfr/Badge";

import { smallUrl } from "../utils";
import { Panel } from "./Panel";
import { GradeBadge } from "./GradeBadge";
import { fr } from "@codegouvfr/react-dsfr";

import { BadgeUpdatedAt } from "./BadgeUpdatedAt";

type HTTPProps = { data: HttpReport; url: string };

const HttpRowBadge = (row: HttpReportTestResult) => {
  const scoreModifier = row.score_modifier;
  const variant =
    scoreModifier < -50
      ? "error"
      : scoreModifier < -30
      ? "error"
      : scoreModifier < -20
      ? "warning"
      : scoreModifier < -10
      ? "warning"
      : "info";
  return (
    <Badge
      style={{ width: 100, textAlign: "center", display: "block" }}
      noIcon
      severity={variant}
    >
      {scoreModifier}
    </Badge>
  );
};

const columns = [
  {
    name: "impact",
    label: "Impact",
    render: (failure) => <HttpRowBadge {...failure} />,
  },
  {
    name: "score_description",
    label: "Description",
    render: ({ score_description }) => (
      <div dangerouslySetInnerHTML={{ __html: score_description }} />
    ),
  },
  {
    name: "documentation",
    label: "Documentation",
    render: ({ name, link }) => (
      <a href={`https://developer.mozilla.org/${link}`} target="_blank">
        Documentation for {name}
      </a>
    ),
  },
];

export const HTTP = ({ data, url }: HTTPProps) => {
  if (!data.scan) {
    return null;
  }
  const mozillaObservatoryUrl =
    (data &&
      `https://developer.mozilla.org/en-US/observatory/analyze?host=${smallUrl(
        url.replace(/^(https?:\/\/[^/]+).*/, "$1")
      )}`) ||
    null;
  const sortedVulns = Object.keys(data.tests)
    .filter((key) => !data.tests[key].pass)
    .sort(
      (a, b) => data.tests[a].score_modifier - data.tests[b].score_modifier
    );
  const tableData = [
    columns.map((col) => col.label),
    ...sortedVulns.map((key) =>
      columns.map((col) =>
        col.render ? col.render(data.tests[key]) : col[key]
      )
    ),
  ];

  return url ? (
    <Panel
      url={mozillaObservatoryUrl}
      urlText="Rapport détaillé"
      isExternal
      title={
        <div>
          Mozilla HTTP observatory
          <BadgeUpdatedAt
            date={data.scan.scanned_at}
            style={{ verticalAlign: "middle", paddingLeft: 10 }}
          />
        </div>
      }
    >
      <div className={fr.cx("fr-text--bold")}>
        Scan Summary : <GradeBadge label={data.scan.grade} />{" "}
      </div>

      {(tableData.length > 1 && <Table data={tableData} />) || null}
    </Panel>
  ) : null;
};
