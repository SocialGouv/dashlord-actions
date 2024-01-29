import * as React from "react";

import Alert from "@codegouvfr/react-dsfr/Alert";
import { format } from "date-fns";
import { Panel } from "./Panel";
import { Grade } from "./Grade";
import { fr } from "@codegouvfr/react-dsfr";
import { GradeBadge } from "./GradeBadge";

const sortByKey = (key: string) => (a: any, b: any) => {
  if (a[key] > b[key]) {
    return 1;
  }
  if (a[key] < b[key]) {
    return -1;
  }
  return 0;
};

const severities = ["INFO", "OK", "LOW", "MEDIUM", "HIGH", "CRITICAL"];
const getSeverityValue = (severity: string) => severities.indexOf(severity);

type SSLProps = { data: SslTestReport; url: string };

const filterByKey = (key) => (item, idx, arr) =>
  !arr.find((v, j) => j < idx && v[key] === item[key]);

export const TestSSL: React.FC<SSLProps> = ({ data, url }) => {
  const gradeEntry = data.find((entry) => entry.id === "overall_grade");
  const grade = data && gradeEntry && gradeEntry.finding;
  const results = data.map((entry) => ({
    ...entry,
    severity_value: getSeverityValue(entry.severity), // add property for sort
  }));
  results.sort(sortByKey("severity_value")).reverse();
  const capReasons = data
    .filter((entry) => entry.id.indexOf("grade_cap_reason_") === 0)
    .reverse();

  const notAfterNode = data.find((r) => r.id === "cert_notAfter");
  const notAfterIntermediateNode = data.find(
    (r) => r.id === "intermediate_cert_notAfter <#1>"
  );

  // warn a month before
  const warningDelay = 30 * 24 * 60 * 60 * 1000;
  let expirationDate: number | null = null;
  if (notAfterNode) {
    if (notAfterIntermediateNode) {
      const closest = Math.min(
        new Date(notAfterNode.finding).getTime(),
        new Date(notAfterIntermediateNode.finding).getTime()
      );
      expirationDate = closest;
    } else {
      expirationDate = new Date(notAfterNode.finding).getTime();
    }
  }

  const expiresSoon =
    expirationDate && new Date().getTime() + warningDelay > expirationDate;

  return (
    (grade && (
      <Panel
        title="SSL"
        info="Informations sur la qualité des certificats SSL via testssl.sh"
        url={url}
        urlText="Rapport détaillé"
        isExternal
      >
        <div className={fr.cx("fr-grid-row")}>
          <div className={fr.cx("fr-col")}>
            <div className={fr.cx("fr-text--bold")}>
              Scan Summary : <GradeBadge label={expiresSoon ? "F" : grade} />
            </div>

            {capReasons.length > 0 && <br />}
            {capReasons.filter(filterByKey("finding")).map((reason: any) => (
              <Alert
                key={reason.finding}
                severity="info"
                title={reason.finding}
              />
            ))}
            {expirationDate && (
              <h4>
                <br />
                Expiration : {format(expirationDate, "dd/MM/yyyy")}
                {expiresSoon && (
                  <i
                    className={fr.cx("fr-ml-1w", "fr-icon-warning-line")}
                    title={`Le SSL arrive à expiration le ${format(
                      expirationDate,
                      "dd/MM/yyyy"
                    )}`}
                  />
                )}
              </h4>
            )}
          </div>
        </div>
      </Panel>
    )) ||
    null
  );
};
