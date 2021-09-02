import * as React from "react";

import { Table } from "@dataesr/react-dsfr";

import { Panel } from "./Panel";
import { Grade } from "./Grade";
import Badge from "./Badge";

const sumCvss = (total: number, vulnerability: NmapVulnerability) =>
  total + Number.parseFloat(vulnerability.cvss);

const orderByCvss = (a: NmapOpenPort, b: NmapOpenPort) =>
  b.service.vulnerabilities.reduce(sumCvss, 0) -
  a.service.vulnerabilities.reduce(sumCvss, 0);

const hasExploit = (service: NmapService) =>
  service.vulnerabilities.filter((vulnerability) => vulnerability.is_exploit)
    .length > 0;

const NmapBadge = (service: NmapService) => {
  const max = service.vulnerabilities.reduce(sumCvss, 0);
  const variant =
    !hasExploit(service) && max > 5 * service.vulnerabilities.length
      ? "warning"
      : hasExploit(service) && max > 5 * service.vulnerabilities.length
      ? "danger"
      : "info";
  return (
    <Badge className="w-100" variant={variant}>
      {variant}
    </Badge>
  );
};

type NmapProps = { data: NmapReport; url: string };

const columns = [
  {
    name: "severty",
    label: "Sévérité",
    render: (service) => <NmapBadge {...service} />,
  },
  {
    name: "service",
    label: "Service à l'écoute",
    render: (service) => `${service.name} (port:${service.id})`,
  },
  {
    name: "vulnerability",
    label: "Vulnérabilités",
    render: (service) =>
      service.vulnerabilities.map((vulnerability) => (
        <div key={vulnerability.id}>
          <a
            target="_blank"
            href={`https://vulners.com/cve/${vulnerability.id}`}
            rel="noopener noreferrer"
          >
            {vulnerability.id}
          </a>
          <br />
        </div>
      )),
  },
];

export const Nmap: React.FC<NmapProps> = ({ data, url }) => {
  const open_ports = data && data.open_ports.length > 0 ? data.open_ports : [];
  data.open_ports.sort(orderByCvss);
  return (
    (data.open_ports.length > 0 && (
      <Panel
        title="Nmap"
        url={url}
        isExternal
        info={(
          <span>
            Scan des vulnérabiliés nmap{" "}
            <a
              style={{ color: "white" }}
              href={`https://${data.host}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`https://${data.host}`}
            </a>
          </span>
        )}
      >
        <h3>
          Scan Summary : 
{' '}
<Grade small grade={data.grade} />
        </h3>
        <Table
          caption="NMap"
          captionPosition="none"
          columns={columns}
          data={open_ports.map((x) => x.service)}
          rowKey="id"
        />
      </Panel>
    )) ||
    null
  );
};
