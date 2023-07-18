import * as React from "react";
import { Callout, CalloutTitle, CalloutText } from "@dataesr/react-dsfr";
import { Clock } from "react-feather";
import { formatDistanceToNow } from "date-fns";
import frLocale from "date-fns/locale/fr";

import Badge from "./Badge";
import styles from "./url.module.scss";
import { btoa } from "../utils";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

import config from "../config.json";

export const UrlHeader = ({
  report,
  url,
}: {
  report: UrlReport;
  url: string;
}) => {
  const lhrReports = Array.isArray(report.lhr) ? report.lhr : [report.lhr];
  const updateDate =
    lhrReports && lhrReports.length && lhrReports[0] && lhrReports[0].fetchTime;
  const title = config.urls.find(
    (url2) => url2.url === url && url2?.title
  )?.title;
  return (
    <Callout hasInfoIcon={false} className="fr-mb-3w">
      <CalloutTitle as="h4">
        <a href={url} rel="noreferrer noopener" target="_blank">
          {url}
        </a>
      </CalloutTitle>
      <CalloutText>
        {report.betagouv?.attributes?.pitch && (
          <div>{report.betagouv?.attributes?.pitch}</div>
        )}
        {title && <div>{title}</div>}
        {report.category && (
          <Badge
            className={styles.badge}
            variant="success"
            to={`/category/${report.category}`}
          >
            {report.category}
          </Badge>
        )}
        {report.tags &&
          report.tags.map((tag: string) => (
            <Badge
              className={styles.badge}
              variant="info"
              key={tag}
              to={`/tag/${tag}`}
            >
              {tag}
            </Badge>
          ))}
        {report.betagouv?.id && (
          <Badge
            className={styles.badge}
            variant="info"
            external={true}
            to={`https://beta.gouv.fr/startups/${report.betagouv?.id}.html`}
          >
            fiche beta.gouv.fr
          </Badge>
        )}
        {updateDate && (
          <>
            <Clock size={16} className={styles.clockIcon} />
            <span title={updateDate} className={styles.clock}>
              Mise à jour il y a :{" "}
              {formatDistanceToNow(new Date(updateDate), {
                locale: frLocale,
              })}
            </span>
          </>
        )}
      </CalloutText>
      {report.screenshot && (
        <img
          className={styles.screenshotImg}
          alt={`Copie d'écran de ${url}`}
          src={`${BASE_PATH}/report/${btoa(url)}/screenshot.jpeg`}
        />
      )}
    </Callout>
  );
};
