import * as React from "react";
import { Table } from "@dataesr/react-dsfr";
import Badge from "./Badge";

import { smallUrl } from "../utils";
import { Panel } from "./Panel";
import { Grade } from "./Grade";

type HTTPProps = { data: HttpReport };

const HttpRowBadge = (row: HttpTestReport) => {
  const scoreModifier = row.score_modifier;
  const variant =
    scoreModifier < -50
      ? "danger"
      : scoreModifier < -30
      ? "danger"
      : scoreModifier < -20
      ? "warning"
      : scoreModifier < -10
      ? "info"
      : "success";
  return (
    <Badge className="w-100" variant={variant}>
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
      . L'extension{" "}
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
      `https://observatory.mozilla.org/analyze/${smallUrl(
        data.url.replace(/^(https?:\/\/[^/]+).*/, "$1")
      )}`) ||
    null;
  const failures = Object.keys(data.details)
    .filter((key) => !data.details[key].pass)
    .map((key) => data.details[key]);
  failures.sort((a, b) => a.score_modifier - b.score_modifier);

  return url ? (
    <Panel
      title="Mozilla HTTP observatory"
      url={url}
      urlText="Retester l'url"
      isExternal
    >
      <h3>
        Scan Summary : <Grade small grade={data.grade} />
      </h3>
      {(failures.length && (
        <Table rowKey="name" columns={columns} data={failures} />
      )) ||
        null}
    </Panel>
  ) : (
    <></>
  );
};
