import * as React from "react";
import { Table, Badge } from "react-bootstrap";

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
    <React.Fragment>
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
    </React.Fragment>
  ),
  "x-frame-options": (
    <React.Fragment>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/X-Frame-Options"
      >
        Doc header X-Frame-Options
      </a>
      .
    </React.Fragment>
  ),
  "strict-transport-security": (
    <React.Fragment>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security"
      >
        Doc header Strict-Transport-Security (HSTS)
      </a>
      .
    </React.Fragment>
  ),
  "x-content-type-options": (
    <React.Fragment>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/X-Content-Type-Options"
      >
        Doc header X-Content-Type-Options
      </a>
      .
    </React.Fragment>
  ),
  "x-xss-protection": (
    <React.Fragment>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection"
      >
        Doc header X-XSS-Protection
      </a>
      .
    </React.Fragment>
  ),
  cookies: (
    <React.Fragment>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#cookies"
      >
        OWASP Session Management Cheat Sheet
      </a>
      .
    </React.Fragment>
  ),
  "subresource-integrity": (
    <React.Fragment>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/fr/docs/Web/Security/Subresource_Integrity"
      >
        Doc Subresource Integrity
      </a>
      .
    </React.Fragment>
  ),
};

export const HTTP = ({ data }: HTTPProps) => {
  if (!data.url) {
    return null;
  }
  const url =
    (data && `https://observatory.mozilla.org/analyze/${smallUrl(data.url)}`) ||
    null;
  const failures = Object.keys(data.details)
    .filter((key) => !data.details[key].pass)
    .map((key) => data.details[key]);
  failures.sort((a, b) => a.score_modifier - b.score_modifier);

  return (
    (url && (
      <Panel
        title="HTTP"
        info="Informations collectées par le Mozilla HTTP observatory"
        url={url}
      >
        <h3>
          Scan Summary : <Grade small grade={data.grade} />
        </h3>
        <br />
        {(failures.length && (
          <React.Fragment>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: 100 }}>impact</th>
                  <th>description</th>
                  <th>documentation</th>
                </tr>
              </thead>
              <tbody>
                {failures.map((failure, i) => (
                  <tr key={failure.name + i}>
                    <td>
                      <HttpRowBadge {...failure} />
                    </td>
                    <td>{failure.score_description}</td>
                    <td>
                      {
                        // @ts-expect-error
                        helpDocs[failure.name] || "-"
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </React.Fragment>
        )) ||
          null}
      </Panel>
    )) ||
    null
  );
};
