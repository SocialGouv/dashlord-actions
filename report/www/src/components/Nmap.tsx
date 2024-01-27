import * as React from "react";
import Link from "next/link";
import Table from "@codegouvfr/react-dsfr/Table";
import Badge from "@codegouvfr/react-dsfr/Badge";

import { Panel } from "./Panel";
import { GradeBadge, IconUnknown } from "./GradeBadge";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";

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
      ? "error"
      : "info";
  return (
    <Badge className="w-100" severity={variant}>
      {variant}
    </Badge>
  );
};

type NmapProps = { data: NmapReport; url: string };

const columns = [
  {
    name: "severity",
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
      (service.vulnerabilities.length > 0 && (
        <div>
          {service.vulnerabilities.length} vulnérabilité(s) trouvée(s) :
          <ul>
            {service.vulnerabilities.map((vulnerability) => (
              <li key={vulnerability.id}>
                <Link
                  href={`https://vulners.com/search?query=${encodeURIComponent(
                    vulnerability.id
                  )}`}
                  target="_blank"
                >
                  1 vulnérabilité de score {vulnerability.cvss}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )) || (
        <div style={{ textAlign: "center" }}>
          <IconUnknown />
        </div>
      ),
  },
];

export const Nmap: React.FC<NmapProps> = ({ data, url }) => {
  const open_ports = data && data.open_ports.length > 0 ? data.open_ports : [];
  data.open_ports.sort(orderByCvss);
  return (
    (data.open_ports.length > 0 && (
      <Panel title="Nmap">
        <div className={fr.cx("fr-text--bold")}>
          Scan Summary : <GradeBadge label={data.grade} />
        </div>
        <Table
          data={[
            columns.map((col) => col.name),
            ...open_ports.map((x) => {
              return columns.map((col) => col.render(x.service));
            }),
          ]}
        />
        {url && (
          <Button linkProps={{ href: url, target: "_blank" }}>
            Consulter le rapport détaillé
          </Button>
        )}
      </Panel>
    )) ||
    null
  );
};
