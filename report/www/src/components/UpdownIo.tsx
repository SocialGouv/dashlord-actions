import * as React from "react";
import { Row, Col, Alert, Card } from "react-bootstrap";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";

import { Panel } from "./Panel";
import { Gauge } from "./Gauge";
import { Grade } from "./Grade";
import { smallUrl } from "../utils";

type UpDownIoProps = { data: UpDownReport; url: string };

export const apdexToGrade = (apdex: number) => {
  return apdex === 1
    ? "A"
    : apdex >= 0.8
    ? "B"
    : apdex > 0.6
    ? "C"
    : apdex > 0.4
    ? "D"
    : apdex > 0.2
    ? "E"
    : "F";
};

export const UpdownIo: React.FC<UpDownIoProps> = ({ data, url }) => {
  const urlUpdownio = (data && `https://updown.io/${data.token}`) || null;

  return (
    (urlUpdownio && smallUrl(data.url) === smallUrl(url) && (
      <Panel
        title="Temps de réponse"
        info="Informations collectées par updown.io"
        url={urlUpdownio}
      >
        <Row>
          <Col xs={12} md={4} className="text-center mb-3">
            <Card>
              <Gauge
                width={100}
                height={20}
                value={data.uptime * 100}
                minValue={0}
                maxValue={100}
                animationSpeed={32}
              />
              <Card.Body>
                <Card.Title>
                  Taux de disponibilité sur un mois glissant
                </Card.Title>
                <Card.Title style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  {data.uptime + "%"}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {data.metrics && (
            <Col xs={12} md={4} className="text-center mb-3">
              <Card>
                <Gauge
                  width={100}
                  height={20}
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
                <Card.Body>
                  <Card.Title>Temps de réponse</Card.Title>
                  <Card.Title style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {data.metrics.timings.total + "ms"}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          )}

          <Col xs={12} md={4} className="text-center mb-3">
            {data?.metrics?.apdex !== undefined && (
              <Card style={{ marginBottom: 10 }}>
                <Card.Body style={{ padding: 5 }}>
                  <Card.Title>APDEX</Card.Title>
                  <div>
                    <Grade
                      grade={apdexToGrade(data.metrics.apdex)}
                      label={data.metrics.apdex}
                    />
                  </div>
                </Card.Body>
              </Card>
            )}

            {data.ssl && (
              <Card>
                <Card.Body style={{ padding: 5 }}>
                  <Card.Title>
                    Certificat TLS{" "}
                    {data.ssl.valid ? (
                      <Grade small grade="A+" label="valide" />
                    ) : (
                      <Grade small grade="F" label="invalide" />
                    )}
                  </Card.Title>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    expire le{" "}
                    {format(new Date(data.ssl.expires_at), "dd/MM/yyyy", {
                      locale: frLocale,
                    })}
                  </div>
                </Card.Body>
              </Card>
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
