import * as React from "react";
import { fr } from "@codegouvfr/react-dsfr";

import { btoa } from "../utils";
import { BadgeUpdatedAt } from "./BadgeUpdatedAt";
import { Gauge } from "./Gauge";
import { Panel } from "./Panel";
import { getPerformanceScore } from "../lib/lighthouse/getPerformanceScore";
import { AccessibilityWarnings } from "../lib/lighthouse/AccessibilityWarnings";
import styles from "./lightHouse.module.scss";

type CardProps = {
  title?: string | React.ReactNode;
  value?: string | React.ReactNode;
  children?: any;
};

const Card: React.FC<CardProps> = ({ children, title, value }) => (
  <div style={{ textAlign: "center" }}>
    {children}
    {title && (
      <div className={fr.cx("fr-text--lead")} style={{ fontSize: "1.2em" }}>
        {title}
      </div>
    )}
    {value && (
      <div
        className={fr.cx("fr-mt-1w", "fr-text--heavy")}
        style={{ fontSize: "2em" }}
      >
        {value}
      </div>
    )}
  </div>
);

const toTime = (ms: number) => {
  let minutes = 0;
  let seconds = 0;
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
  let mb = 0;
  let kb = 0;
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

type LighthouseProps = { data: UrlReport["lhr"]; url: string };

export const LightHouse: React.FC<LighthouseProps> = ({ data, url }) => {
  const audits =
    (Array.isArray(data) && data) ||
    ([data] as LighthouseReport[]).filter(
      (audit) => !!audit.audits.metrics.details
    );

  const order = ["accessibility", "performance", "seo", "best-practices"];

  // todo: URL vers le rapport complet
  return (
    <Panel
      title="LightHouse"
      info="Informations collectées par l'outil Google LightHouse"
    >
      <div className={fr.cx("fr-grid-row")}>
        <div className={fr.cx("fr-col-12")}>
          <AccessibilityWarnings className={styles.accesibility} />
        </div>
      </div>

      {audits.map((audit) => {
        // use custom performance scoring
        audit.categories.performance.score = getPerformanceScore(audit);

        const highlights = {
          "First contentful Paint":
            audit.audits.metrics.details &&
            audit.audits.metrics.details.items &&
            toTime(audit.audits.metrics.details.items[0].firstContentfulPaint),
          "Time to interactive":
            audit.audits.metrics.details &&
            audit.audits.metrics.details.items &&
            toTime(audit.audits.metrics.details.items[0].interactive),
          "Total requests":
            audit.audits.diagnostics.details &&
            audit.audits.diagnostics.details.items &&
            audit.audits.diagnostics.details.items[0].numRequests,
          "Total weight":
            audit.audits.diagnostics.details &&
            audit.audits.diagnostics.details.items &&
            toSize(audit.audits.diagnostics.details.items[0].totalByteWeight),
          // "Max server Latency": toTime(
          //   data.audits.diagnostics.details.items[0].maxServerLatency
          //   ),
        } as object;

        const auditUrl = `${url}/lhr-${btoa(audit.requestedUrl)}.html`;
        return (
          <Panel
            title={
              <div className={fr.cx("fr-mb-4w")}>
                {audit.requestedUrl}
                <BadgeUpdatedAt
                  date={audit.fetchTime}
                  style={{ verticalAlign: "middle", paddingLeft: 10 }}
                />
              </div>
            }
            titleAs="h3"
            info="Informations collectées par l'outil Google LightHouse"
            urlText="Rapport LightHouse"
            url={auditUrl}
            isExternal
            key={audit.requestedUrl}
          >
            <div className={fr.cx("fr-grid-row")}>
              {order.map((key) => {
                const category =
                  audit.categories[key as LighthouseReportCategoryKey];
                const score = category.score as number;
                return (
                  (!Number.isNaN(score) && (
                    <div
                      key={category.id}
                      className={fr.cx(
                        "fr-col-sm-12",
                        "fr-col-md-6",
                        "fr-col-lg-3",
                        "fr-mb-2w"
                      )}
                    >
                      <Card
                        title={category.title}
                        value={`${(score * 100).toFixed()}%`}
                      >
                        <Gauge
                          width={200}
                          height={140}
                          value={score * 100}
                          style={{ margin: 10 }}
                          minValue={0}
                          maxValue={100}
                          segments={3}
                          currentValueText=""
                        />
                      </Card>
                    </div>
                  )) ||
                  null
                );
              })}
            </div>
            <div className={fr.cx("fr-grid-row")}>
              {Object.keys(highlights).map((label) => (
                <div
                  key={label}
                  className={fr.cx(
                    "fr-col-sm-12",
                    "fr-col-md-6",
                    "fr-col-lg-3",
                    "fr-mb-2w"
                  )}
                >
                  <Card title={label} value={highlights[label]} />
                </div>
              ))}
            </div>
          </Panel>
        );
      })}
    </Panel>
  );
};
