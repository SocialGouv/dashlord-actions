import * as React from "react";

import { Table, Badge } from "react-bootstrap";

import { Panel } from "./Panel";

const sumCvss = (total: number, vulnerability: NmapVulnerability) => {
   return total + Number.parseFloat(vulnerability.cvss);
}

const orderByCvss = (a: NmapOpenPort, b: NmapOpenPort) => {
  return b.service.vulnerabilities.reduce(sumCvss, 0) - a.service.vulnerabilities.reduce(sumCvss, 0);
};

const hasExploit = (open_port: NmapOpenPort) => {
  return open_port.service.vulnerabilities.filter((vulnerability) => vulnerability.is_exploit).length > 0;
};

const NmapBadge = (open_port: NmapOpenPort) => {
  const max = open_port.service.vulnerabilities.reduce(sumCvss, 0);
  const variant =
  !hasExploit(open_port) && max > 5 * open_port.service.vulnerabilities.length
      ? "warning" :
      hasExploit(open_port) && max > 5 * open_port.service.vulnerabilities.length
        ? "danger"
        : "info";
  return (
    <Badge className="w-100" variant={variant}>
      {open_port.service.vulnerabilities.length}
    </Badge>
  );
};

type NmapProps = { data: NmapReport; url: string; };

export const Nmap: React.FC<NmapProps> = ({ data, url }) => {
  const open_ports =
    data && data.open_ports.length > 0
      ? data.open_ports
      : [];
  data.open_ports.sort(orderByCvss);
  return (
    (data.open_ports.length > 0 && (
      <Panel
        title="Nmap"
        url={url}
        info={
          <span>
            Scan des vulnérabiliés nmap {" "}
            <a
              style={{ color: "white" }}
              href={'https://' + data.host}
              target="_blank"
              rel="noopener noreferrer"
            >
              {'https://' + data.host}
            </a>
          </span>
        }
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: 100 }} className="text-center">
                Sévérité
              </th>
              <th>Service vulnérable</th>
              <th>Vulnérabilités</th>
            </tr>
          </thead>
          <tbody>
            {open_ports.map((open_port, i: number) => {
              return (
                <tr key={open_port.service.name + i}>
                  <td className="text-center">
                    <NmapBadge {...open_port} />
                  </td>
                  <td>{open_port.service.name + ' (port:' + open_port.service.id + ')'}</td>
                  <td>
                    {open_port.service.vulnerabilities.map(
                      (vulnerability, i: number) => {
                        return (
                          <p key={vulnerability.id + i}>
                            <a target="_blank" href={'https://vulners.com/cve/' + vulnerability.id} rel="noopener noreferrer">
                              {vulnerability.id}
                            </a>
                            <br />
                          </p>
                        );
                      }
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Panel>
    )) ||
    null
  );
};