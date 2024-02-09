import * as React from "react";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";

import { Panel } from "./Panel";
import { Gauge } from "./Gauge";
import { GradeBadge } from "./GradeBadge";
import { smallUrl } from "../utils";

import styles from "./updownIo.module.scss";
import { fr } from "@codegouvfr/react-dsfr";
import { ReactNode } from "react";
import { BadgeUpdatedAt } from "./BadgeUpdatedAt";

type UpDownIoProps = {
  data: UpDownReport;
  url: string;
  title?: React.ReactNode;
};

const DEFAULT_TITLE = "Disponibilité et temps de réponse";
const DEFAULT_INFO = "Informations collectées par updown.io";

type MetricProps = {
  title?: string | React.ReactNode;
  value?: string | React.ReactNode;
  children: ReactNode;
};

const UpDownMetric: React.FC<MetricProps> = ({ children, title, value }) => (
  <div className={`${styles.metric} ${fr.cx("fr-col-4")}`}>
    {children}
    {title && <div className={styles.metricTitle}>{title}</div>}
    {value && <div className={styles.metricValue}>{value}</div>}
  </div>
);

export const UpdownIo: React.FC<UpDownIoProps> = ({ data, url, title }) => {
  const urlUpdownio = (data && `https://updown.io/${data.token}`) || null;
  return (
    (urlUpdownio && smallUrl(data.url) === smallUrl(url) && (
      <Panel
        title={
          <div>
            {title || DEFAULT_TITLE}
            <BadgeUpdatedAt
              date={data.last_check_at}
              style={{ verticalAlign: "middle", paddingLeft: 10 }}
            />
          </div>
        }
        info={DEFAULT_INFO}
        url={urlUpdownio}
        urlText="Statistiques détaillées"
        isExternal
      >
        <div
          className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-3w")}
        >
          <UpDownMetric
            title="Taux de disponibilité sur un mois glissant"
            value={`${data.uptime}%`}
          >
            <Gauge
              width={200}
              height={120}
              value={data.uptime}
              minValue={0}
              maxValue={100}
              segments={3}
              currentValueText=""
            />
          </UpDownMetric>

          {data?.metrics?.apdex !== undefined && (
            <UpDownMetric
              title="APDEX: Application Performance Index"
              value={`${data.metrics.apdex}`}
            >
              <Gauge
                width={200}
                height={120}
                value={data.metrics.apdex}
                minValue={0}
                maxValue={1}
                segments={3}
                currentValueText=""
              />
            </UpDownMetric>
          )}

          {data.metrics && data.metrics.timings && (
            <UpDownMetric
              title="Temps de réponse"
              value={`${data.metrics.timings.total}ms`}
            >
              <Gauge
                width={200}
                height={120}
                value={Math.max(0, data.metrics.timings.total)}
                minValue={0}
                maxValue={1000}
                customSegmentStops={[0, 150, 500, 1000]}
                reverseColors={true}
                currentValueText=""
              />
            </UpDownMetric>
          )}
        </div>
        <div className={styles.left}>
          <div className="fr-mb-3w">
            {data.ssl && (
              <div style={{ padding: 10 }}>
                <br />
                <br />
                Le certificat SSL est{" "}
                {data.ssl.valid ? (
                  <GradeBadge label="valide" severity="success" />
                ) : (
                  <GradeBadge label="invalide" severity="error" />
                )}{" "}
                et expire le{" "}
                <strong>
                  {format(new Date(data.ssl.expires_at), "dd/MM/yyyy", {
                    locale: frLocale,
                  })}
                </strong>
              </div>
            )}
          </div>
        </div>
      </Panel>
    )) || (
      <Panel title={title || DEFAULT_TITLE} info={DEFAULT_INFO}>
        <Alert
          className={fr.cx("fr-mt-3w")}
          severity="info"
          title="Données absentes"
          description="Aucune donnée updown.io associée"
        />
      </Panel>
    )
  );
};
