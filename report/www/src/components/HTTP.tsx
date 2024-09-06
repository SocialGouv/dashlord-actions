import * as React from "react";
import Table from "@codegouvfr/react-dsfr/Table";
import Badge from "@codegouvfr/react-dsfr/Badge";

import { smallUrl } from "../utils";
import { Panel } from "./Panel";
import { GradeBadge } from "./GradeBadge";
import { fr } from "@codegouvfr/react-dsfr";

import { BadgeUpdatedAt } from "./BadgeUpdatedAt";

type HTTPProps = { data: HttpReport };

const HttpRowBadge = (row: HttpTestReport) => {
  const scoreModifier = row.score_modifier;
  const variant =
    scoreModifier < -50
      ? "error"
      : scoreModifier < -30
      ? "error"
      : scoreModifier < -20
      ? "warning"
      : scoreModifier < -10
      ? "info"
      : "success";
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

// some help for remediation
const helpDocs = {
  "content-security-policy": (
    <>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://owasp.org/www-community/controls/Content_Security_Policy"
      >
        Doc Content Security Policy
      </a>
      . L&apos;extension{" "}
      <a
        href="https://github.com/april/laboratory"
        rel="noopener noreferrer"
        target="_blank"
      >
        github.com/april/laboratory
      </a>{" "}
      permet de générer la CSP pour votre application.
    </>
  ),
  "x-frame-options": (
    <>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/X-Frame-Options"
      >
        Doc header X-Frame-Options
      </a>
      .
    </>
  ),
  "strict-transport-security": (
    <>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security"
      >
        Doc header Strict-Transport-Security (HSTS)
      </a>
      .
    </>
  ),
  "x-content-type-options": (
    <>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/X-Content-Type-Options"
      >
        Doc header X-Content-Type-Options
      </a>
      .
    </>
  ),
  "x-xss-protection": (
    <>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection"
      >
        Doc header X-XSS-Protection
      </a>
      .
    </>
  ),
  cookies: (
    <>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#cookies"
      >
        OWASP Session Management Cheat Sheet
      </a>
      .
    </>
  ),
  "subresource-integrity": (
    <>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/fr/docs/Web/Security/Subresource_Integrity"
      >
        Doc Subresource Integrity
      </a>
      .
    </>
  ),
};

const columns = [
  {
    name: "impact",
    label: "Impact",
    render: (failure) => <HttpRowBadge {...failure} />,
  },
  { name: "score_description", label: "Description" },
  {
    name: "documentation",
    label: "Documentation",
    render: ({ name }) => helpDocs[name] || "-",
  },
];

export const HTTP = ({ data }: HTTPProps) => {
  if (!data.url) {
    return null;
  }
  const url =
    (data &&
      `https://developer.mozilla.org/fr/observatory/analyze?host=${smallUrl(
        data.url.replace(/^(https?:\/\/[^/]+).*/, "$1")
      )}`) ||
    null;
  const sortedVulns = Object.keys(data.details)
    .filter((key) => !data.details[key].pass)
    .sort(
      (a, b) => data.details[a].score_modifier - data.details[b].score_modifier
    );
  const tableData = [
    columns.map((col) => col.label),
    ...sortedVulns.map((key) =>
      columns.map((col) =>
        col.render ? col.render(data.details[key]) : col[key]
      )
    ),
  ];

  return url ? (
    <Panel
      url={url}
      urlText="Rapport détaillé"
      isExternal
      title={
        <div>
          Mozilla HTTP observatory
          <BadgeUpdatedAt
            date={data.start_time}
            style={{ verticalAlign: "middle", paddingLeft: 10 }}
          />
        </div>
      }
    >
      <div className={fr.cx("fr-text--bold")}>
        Scan Summary : <GradeBadge label={data.grade} />{" "}
      </div>

      {(tableData.length > 1 && <Table data={tableData} />) || null}
    </Panel>
  ) : (
    <></>
  );
};
