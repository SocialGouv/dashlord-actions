import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { Link } from "react-router-dom";
import { Clock } from "react-feather";
import { Jumbotron, Badge } from "react-bootstrap";

import { isToolEnabled } from "../utils";
import { HTTP } from "./HTTP";
import { LightHouse } from "./LightHouse";
import { Nuclei } from "./Nuclei";
import { Owasp } from "./Owasp";
import { TestSSL } from "./TestSSL";
import { Trackers } from "./Trackers";
import { Wappalyzer } from "./Wappalyzer";
import { UpdownIo } from "./UpdownIo";
import { Dependabot } from "./Dependabot";
import { Codescan } from "./Codescan";
import { Nmap } from "./Nmap";

type UrlDetailProps = { url: string; report: UrlReport };

export const Url: React.FC<UrlDetailProps> = ({ url, report, ...props }) => {
  const updateDate = report && report.lhr && report.lhr.fetchTime;
  if (!report) {
    return <div>No data available for {url}</div>;
  }
  return (
    <div>
      <Jumbotron
        style={{
          height: 100,
          marginTop: 10,
          paddingTop: 20,
          marginBottom: 10,
          display: "flex",
        }}
      >
        <div style={{ flex: "1 0 auto" }}>
          <h4>
            <a href={url} rel="noreferrer noopener" target="_blank">
              {url}
            </a>
          </h4>
          <p>
            {report.category && (
              <Link to={`/category/${report.category}`}>
                <Badge style={{ marginRight: 5 }} variant="success">
                  {report.category}
                </Badge>
              </Link>
            )}
            {report.tags &&
              report.tags.map((tag: string) => (
                <Link key={tag} to={`/tag/${tag}`}>
                  <Badge style={{ marginRight: 5 }} variant="info">
                    {tag}
                  </Badge>
                </Link>
              ))}
            {updateDate && (
              <span title={updateDate}>
                <Clock size={12} style={{ marginRight: 5 }} />
                Mise à jour il y a :{" "}
                {formatDistanceToNow(new Date(updateDate), {
                  locale: frLocale,
                })}
              </span>
            )}
          </p>
        </div>
        <div style={{ flex: "0 0 100px", marginTop: -10 }}>
          {report.screenshot && (
            <a href={url} rel="noreferrer noopener" target="_blank">
              <img
                style={{
                  position: "relative",
                  top: 0,
                  maxHeight: 80,
                  border: "1px solid var(--dark)",
                }}
                src={`${process.env.PUBLIC_URL}/report/${window.btoa(
                  url
                )}/screenshot.jpeg`}
              />
            </a>
          )}
        </div>
      </Jumbotron>
      {(isToolEnabled("lighthouse") && report.lhr && (
        <React.Fragment>
          <LightHouse
            data={report.lhr}
            url={`${process.env.PUBLIC_URL}/report/${window.btoa(
              url
            )}/lhr.html`}
          />
          <br />
        </React.Fragment>
      )) ||
        null}
      {(isToolEnabled("dependabot") && report.dependabot && (
        <React.Fragment>
          {report.dependabot.filter(Boolean).map((repository) => {
            return (
              <Dependabot key={repository.url} data={repository} url={url} />
            );
          })}
          <br />
        </React.Fragment>
      )) ||
        null}
      {(isToolEnabled("codescan") && report.codescan && (
        <React.Fragment>
          {report.codescan.filter(Boolean).map((repository) => {
            return (
              <Codescan key={repository.url} data={repository} url={url} />
            );
          })}
          <br />
        </React.Fragment>
      )) ||
        null}
      {(isToolEnabled("updownio") && report.updownio && (
        <React.Fragment>
          <UpdownIo data={report.updownio} url={url} />
          <br />
        </React.Fragment>
      )) ||
        null}
      {(isToolEnabled("testssl") && report.testssl && (
        <React.Fragment>
          <TestSSL
            data={report.testssl}
            url={`${process.env.PUBLIC_URL}/report/${window.btoa(
              url
            )}/testssl.html`}
          />
          <br />
        </React.Fragment>
      )) ||
        null}
      {(isToolEnabled("nmap") && report.nmap && (
        <React.Fragment>
          <Nmap data={report.nmap} />
          <br />
        </React.Fragment>
      )) ||
        null}
      {(isToolEnabled("http") && report.http && (
        <React.Fragment>
          <HTTP data={report.http} />
          <br />
        </React.Fragment>
      )) ||
        null}
      {(isToolEnabled("thirdparties") && report.thirdparties && (
        <React.Fragment>
          <Trackers data={report.thirdparties} />
          <br />
        </React.Fragment>
      )) ||
        null}
      {(isToolEnabled("zap") && report.zap && (
        <React.Fragment>
          <Owasp
            data={report.zap}
            url={`${process.env.PUBLIC_URL}/report/${window.btoa(
              url
            )}/zap.html`}
          />
          <br />
        </React.Fragment>
      )) ||
        null}
      {(isToolEnabled("nuclei") && report.nuclei && (
        <React.Fragment>
          <Nuclei data={report.nuclei} />
          <br />
        </React.Fragment>
      )) ||
        null}
      {(isToolEnabled("wappalyzer") && report.wappalyzer && (
        <React.Fragment>
          <Wappalyzer data={report.wappalyzer} />
          <br />
        </React.Fragment>
      )) ||
        null}
    </div>
  );
};
