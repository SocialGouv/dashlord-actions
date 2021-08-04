import * as React from 'react';

import { Row, Col } from '@dataesr/react-dsfr';
import { Gauge } from './Gauge';
import { Panel } from './Panel';
import { getPerformanceScore } from '../lib/lighthouse/getPerformanceScore';
import { AccessibilityWarnings } from '../lib/lighthouse/AccessibilityWarnings';

import styles from './lightHouse.cssmodule.scss';
import Card from './Card';

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

type LighthouseProps = { data: LighthouseReport; url: string };

export const LightHouse: React.FC<LighthouseProps> = ({ data, url }) => {
  if (!data.audits.metrics.details) {
    return null;
  }

  const highlights = {
    'First contentful Paint':
      data.audits.metrics.details
      && data.audits.metrics.details.items
      && toTime(data.audits.metrics.details.items[0].firstContentfulPaint),
    'Time to interactive':
      data.audits.metrics.details
      && data.audits.metrics.details.items
      && toTime(data.audits.metrics.details.items[0].interactive),
    'Total requests':
      data.audits.diagnostics.details
      && data.audits.diagnostics.details.items
      && data.audits.diagnostics.details.items[0].numRequests,
    'Total weight':
      data.audits.diagnostics.details
      && data.audits.diagnostics.details.items
      && toSize(data.audits.diagnostics.details.items[0].totalByteWeight),
    // "Max server Latency": toTime(
    //   data.audits.diagnostics.details.items[0].maxServerLatency
    //   ),
  } as object;

  const order = ['accessibility', 'performance', 'seo', 'best-practices'];

  // use custom scoring
  data.categories.performance.score = getPerformanceScore(data);

  return (
    <Panel
      title="LightHouse"
      info="Informations collectées par l'outil Google LightHouse"
      url={url}
      isExternal
    >
      <Row>
        <Col>
          <AccessibilityWarnings className={styles.accesibility} />
        </Col>
      </Row>
      <Row>
        {order.map((key) => {
          const category = data.categories[key as LighthouseReportCategoryKey];
          const score = category.score as number;
          return (
            (!Number.isNaN(score) && (
              <Col
                key={category.id}
                n="12 sm-12 md-6 lg-3"
                className="fr-mb-2w"
              >
                <Card
                  title={category.title}
                  value={`${(score * 100).toFixed()}%`}
                >
                  <Gauge
                    width={100}
                    height={60}
                    value={score * 100}
                    minValue={0}
                    maxValue={100}
                    animationSpeed={32}
                  />
                </Card>
              </Col>
            ))
          );
        })}
      </Row>
      <Row>
        {Object.keys(highlights).map((label) => (
          <Col
            n="12 sm-12 md-6 lg-3"
            key={label}
            className="fr-mb-2w"
          >
            <Card title={label} value={highlights[label]} />
          </Col>
        ))}
      </Row>
    </Panel>
  );
};
