import * as React from "react";

import { Row, Col, Card } from "react-bootstrap";
import { Gauge } from "./Gauge";
import { Panel } from "./Panel";
import { getPerformanceScore } from "../lib/lighthouse/getPerformanceScore";
import { AccessibilityWarnings } from "../lib/lighthouse/AccessibilityWarnings";

const toTime = (ms: number) => {
  let minutes = 0,
    seconds = 0;
  let rest = ms;
  if (rest > 60 * 1000) {
    minutes = Math.floor(rest / 60000);
    rest -= minutes * 60000;
  }
  if (rest > 1000) {
    seconds = Math.floor(rest / 1000);
    rest -= seconds * 1000;
  }
  if (minutes > 0) {
    return `${minutes}min ${(seconds / 100).toFixed()}s`;
  }
  return `${seconds}.${(rest / 100).toFixed()}s`;
};

const toSize = (bytes: number) => {
  const factor = 1000;
  let mb = 0,
    kb = 0;
  let rest = bytes;
  if (rest > factor * factor) {
    mb = Math.floor(rest / (factor * factor));
    rest -= mb * factor * factor;
  }
  if (rest > factor) {
    kb = Math.floor(rest / factor);
    rest -= kb * factor;
  }
  if (mb > 0) {
    return `${mb}.${(kb / 100).toFixed()}Mb`;
  }
  return `${kb}.${(rest / 100).toFixed()}Kb`;
};

type LighthouseProps = { data: LighthouseReport; url: string };

export const LightHouse: React.FC<LighthouseProps> = ({ data, url }) => {
  if (!data.audits.metrics.details) {
    return null;
  }

  const highlights = {
    "First contentful Paint":
      data.audits.metrics.details &&
      data.audits.metrics.details.items &&
      toTime(data.audits.metrics.details.items[0].firstContentfulPaint),
    "Time to interactive":
      data.audits.metrics.details &&
      data.audits.metrics.details.items &&
      toTime(data.audits.metrics.details.items[0].interactive),
    "Total requests":
      data.audits.diagnostics.details &&
      data.audits.diagnostics.details.items &&
      data.audits.diagnostics.details.items[0].numRequests,
    "Total weight":
      data.audits.diagnostics.details &&
      data.audits.diagnostics.details.items &&
      toSize(data.audits.diagnostics.details.items[0].totalByteWeight),
    // "Max server Latency": toTime(
    //   data.audits.diagnostics.details.items[0].maxServerLatency
    //   ),
  } as object;

  const order = ["accessibility", "performance", "seo", "best-practices"];

  // use custom scoring
  data.categories["performance"].score = getPerformanceScore(data);

  return (
    <Panel
      title="LightHouse"
      info="Informations collectées par l'outil Google LightHouse"
      url={url}
    >
      <Row>
        <Col xs={12}>
          <AccessibilityWarnings style={{ marginBottom: 20 }} />
        </Col>
        {order.map((key, i: number) => {
          const category = data.categories[key as LighthouseReportCategoryKey];
          const score = category.score as number;
          return (
            (!isNaN(score) && (
              <Col
                key={category.title + i}
                xs={12}
                md={6}
                lg={3}
                className="text-center mb-3"
              >
                <Card>
                  <Gauge
                    width={100}
                    height={60}
                    value={score * 100}
                    minValue={0}
                    maxValue={100}
                    animationSpeed={32}
                  />
                  <Card.Body>
                    <Card.Title>{category.title}</Card.Title>
                    <Card.Title
                      style={{ fontSize: "2rem", fontWeight: "bold" }}
                    >
                      {(score * 100).toFixed() + "%"}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )) ||
            null
          );
        })}
      </Row>
      <Row>
        {Object.keys(highlights).map((label) => {
          return (
            <Col xs={12} md={6} lg={3} key={label} className="text-center mb-3">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title style={{ fontSize: "0.9rem" }}>
                    {label}
                  </Card.Title>
                  <Card.Title
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    {/* @ts-expect-error */}
                    {highlights[label]}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Panel>
  );
};
