import * as React from "react";

import { Row, Col, Alert } from "@dataesr/react-dsfr";
import { Info } from "react-feather";

import { Panel } from "./Panel";
import { Grade } from "./Grade";

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
  return (
    (grade && (
      <Panel
        title="SSL"
        info="Informations collectées via testssl.sh"
        url={url}
        isExternal
      >
        <Row>
          <Col>
            <h3>
              Scan Summary : 
{' '}
<Grade small grade={grade} />
            </h3>
            {capReasons.length > 0 && <br />}
            {capReasons.map((reason: any) => (
              <Alert key={reason.id} type="info" title={reason.finding} />
            ))}
          </Col>
        </Row>
      </Panel>
    )) ||
    null
  );
};
