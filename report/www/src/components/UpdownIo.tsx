import * as React from "react";
import { Row, Col, Alert, CardDescription } from "@dataesr/react-dsfr";
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
        title="Disponibilité et temps de réponse"
        info="Informations collectées par updown.io"
        url={urlUpdownio}
        urlText="Statistiques détaillées"
        isExternal
      >
        <Row>
          <Col n="12 sm-12 md-4" className="fr-mb-3w">
            <Card
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
            </Card>
          </Col>

          {data?.metrics?.apdex !== undefined && (
            <Col n="12 sm-12 md-4" className="fr-mb-3w">
              <Card
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
              </Card>
            </Col>
          )}

          {data.metrics && data.metrics.timings && (
            <Col n="12 sm-12 md-4" className="fr-mb-3w">
              <Card
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
              </Card>
            </Col>
          )}
        </Row>
        <Row className={styles.left}>
          <Col n="12" className="fr-mb-3w">
            {data.ssl && (
              <div style={{ padding: 10 }}>
                <br />
                <br />
                Le certificat SSL est{" "}
                {data.ssl.valid ? (
                  <Grade small grade="A+" label="valide" />
                ) : (
                  <Grade small grade="F" label="invalide" />
                )}{" "}
                et expire le{" "}
                <strong>
                  {format(new Date(data.ssl.expires_at), "dd/MM/yyyy", {
                    locale: frLocale,
                  })}
                </strong>
              </div>
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
