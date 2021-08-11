import * as React from "react";
import { Row, Col, Alert } from "@dataesr/react-dsfr";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";

import { Panel } from "./Panel";
import { Gauge } from "./Gauge";
import { Grade } from "./Grade";
import { smallUrl } from "../utils";
import Card from "./Card";

import styles from "./updownIo.cssmodule.scss";

type UpDownIoProps = { data: UpDownReport; url: string };

export const UpdownIo: React.FC<UpDownIoProps> = ({ data, url }) => {
  const urlUpdownio = (data && `https://updown.io/${data.token}`) || null;

  return (
    (urlUpdownio && smallUrl(data.url) === smallUrl(url) && (
      <Panel
        title="Temps de réponse"
        info="Informations collectées par updown.io"
        url={urlUpdownio}
        isExternal
      >
        <Row>
          <Col n="12 sm-12 md-6" className="fr-mb-3w">
            <Card
              title="Taux de disponibilité sur un mois glissant"
              value={`${data.uptime}%`}
            >
              <Gauge
                width={120}
                height={80}
                value={data.uptime * 100}
                minValue={0}
                maxValue={100}
                animationSpeed={32}
              />
            </Card>
          </Col>

          {data.metrics && (
            <Col n="12 sm-12 md-6" className="fr-mb-3w">
              <Card
                title="Temps de réponse"
                value={`${data.metrics.timings.total}ms`}
              >
                <Gauge
                  width={120}
                  height={60}
                  value={Math.max(0, data.metrics.timings.total)}
                  minValue={0}
                  maxValue={1000}
                  animationSpeed={32}
                  options={{
                    percentColors: [
                      [0, "#0CCE6B"],
                      [0.4, "#0CCE6B"],
                      [0.6, "#ffa400"],
                      [0.8, "#FF4E42"],
                    ],
                  }}
                />
              </Card>
            </Col>
          )}
        </Row>
        <Row className={styles.values}>
          <Col n="12 sm-12 md-6" className="fr-mb-3w">
            {data?.metrics?.apdex !== undefined && (
              <Card
                title="APDEX"
                value={
                  <Grade grade={data.apdexGrade} label={data.metrics.apdex} />
                }
              />
            )}
          </Col>
          <Col n="12 sm-12 md-6" className="fr-mb-3w">
            {data.ssl && (
              <Card
                title={
                  <>
                    Certificat TLS{" "}
                    {data.ssl.valid ? (
                      <Grade small grade="A+" label="valide" />
                    ) : (
                      <Grade small grade="F" label="invalide" />
                    )}
                  </>
                }
                value={`expire le ${format(
                  new Date(data.ssl.expires_at),
                  "dd/MM/yyyy",
                  {
                    locale: frLocale,
                  }
                )}`}
              />
            )}
          </Col>
        </Row>
      </Panel>
    )) || (
      <Panel
        title="Temps de réponse"
        info="Informations collectées par updown.io"
      >
        <Alert variant="success">Aucune donnée updown.io associée</Alert>
      </Panel>
    )
  );
};
