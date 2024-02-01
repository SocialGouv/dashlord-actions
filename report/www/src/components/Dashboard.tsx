import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";

import { AlertProps } from "@codegouvfr/react-dsfr/Alert";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fr } from "@codegouvfr/react-dsfr";

import { isToolEnabled, smallUrl, slugifyUrl } from "../utils";
import { getLatestPhase } from "./BetagouvInfo";
import { GradeBadge, IconUnknown } from "./GradeBadge";

type DashboardProps = { report: DashLordReport };

export const Dashboard: React.FC<DashboardProps> = ({ report }) => {
  const defaultColumnsProps = {
    sortable: true,
    width: 120,
    type: "string",
    headerAlign: "center" as const,
    align: "center" as const,
  };

  let columns: GridColDef[] = [
    {
      ...defaultColumnsProps,
      field: "url",
      headerAlign: "left",
      align: "left",
      headerName: `URL ${report && `(${report.length})`}`,
      width: 300,
      renderCell: (params) => (
        <div
          style={{
            width: "95%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <Link
            prefetch={false}
            title={`Voir les détails de l'url ${slugifyUrl(params.value)}`}
            href={`/url/${encodeURIComponent(slugifyUrl(params.value))}`}
          >
            <i className={fr.cx("fr-icon-search-line", "fr-icon--sm")} />
            &nbsp;
            {smallUrl(params.value)}
          </Link>
        </div>
      ),
    },
  ];

  const phaseSeverities = {
    accélération: "info",
    construction: "warning",
    "partenariat terminé": "error",
    transfert: "success",
    succès: "success",
  };

  if (isToolEnabled("betagouv")) {
    columns.push({
      ...defaultColumnsProps,
      field: "beta-phase",
      headerName: `Phase`,
      width: 250,
      valueGetter: (params) => {
        return (
          (params.row.betagouv &&
            getLatestPhase(params.row.betagouv.attributes.phases).index) ||
          ""
        );
      },
      renderCell: (params) => {
        if (!isToolEnabled("betagouv", params.row.url)) return <IconUnknown />;
        const latestPhase =
          params.row.betagouv &&
          getLatestPhase(params.row.betagouv.attributes.phases);
        if (latestPhase) {
          return (
            <Badge
              severity={
                phaseSeverities[latestPhase.label.toLowerCase()] || "info"
              }
              noIcon
            >
              {latestPhase.label}
            </Badge>
          );
        } else {
          return <IconUnknown />;
        }
      },
    });

    if (isToolEnabled("declaration-a11y")) {
      columns.push({
        ...defaultColumnsProps,
        field: "declaration-a11y",
        headerName: `Déclaration d'accessibilité`,
        description:
          "Présence de la mention de conformité et de la déclaration",
        width: 150,
        valueGetter: (params) => {
          return params.row.summary["declaration-a11y"] || "";
        },
        renderCell: (params) => {
          if (!isToolEnabled("declaration-a11y", params.row.url))
            return <IconUnknown />;
          const grade = params.row.summary["declaration-a11y"];
          if (grade) {
            return (
              <GradeBadge
                title={`Voir les détails de la déclaration d'accessibiilité pour l'url ${slugifyUrl(
                  params.row.url
                )}`}
                label={grade}
                hideLabelOnWarning
                linkProps={{
                  href: `/url/${slugifyUrl(
                    params.row.url
                  )}/best-practices/#declaration-a11y`,
                }}
              />
            );
          }
          return <IconUnknown />;
        },
      });
    }
  }

  if (isToolEnabled("github_repository")) {
    columns.push({
      ...defaultColumnsProps,
      field: "github_repository",
      headerName: `OpenSource`,
      width: 110,
      valueGetter: (params) => {
        return params.row.summary.githubRepositoryGrade || "";
      },
      renderCell: (params) => {
        if (!isToolEnabled("github_repository", params.row.url))
          return <IconUnknown />;

        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge showWarningOnError showCheckOnSuccess label={grade} />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("declaration-rgpd")) {
    columns.push({
      ...defaultColumnsProps,
      field: "declaration-rgpd-ml",
      headerName: `Mentions légales`,
      description: "Présence des mentions légales et conformité de celles-ci",
      width: 150,
      valueGetter: (params) => {
        return params.row.summary["declaration-rgpd-ml"] || "";
      },
      renderCell: (params) => {
        if (!isToolEnabled("declaration-rgpd", params.row.url))
          return <IconUnknown />;

        const grade = params.value;
        const warning =
          params.row.summary["declaration-rgpd-ml"] === "D"
            ? "Les mentions légales sont présentes mais incomplètes. Consultez les détails pour plus d'informations"
            : params.row.summary["declaration-rgpd-ml"] === "F"
            ? "Les mentions légales n'ont pas été détectées"
            : null;
        if (grade) {
          return (
            <GradeBadge
              showCheckOnSuccess
              hideLabelOnWarning
              label={grade}
              warning={warning}
              title={`Voir les détails de la conformité juridique pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/best-practices/#declaration-rgpd`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });

    columns.push({
      ...defaultColumnsProps,
      field: "declaration-rgpd-pc",
      headerName: `Politique de confidentialité`,
      description:
        "Présence de la politique de confidentialité et conformité de celle-ci",
      width: 150,
      valueGetter: (params) => {
        return params.row.summary["declaration-rgpd-pc"] || "";
      },
      renderCell: (params) => {
        if (!isToolEnabled("declaration-rgpd", params.row.url))
          return <IconUnknown />;
        const grade = params.value;
        const warning =
          params.row.summary["declaration-rgpd-pc"] === "D"
            ? "La politique de confidentialité est présente mais incomplète. Consultez les détails pour plus d'informations"
            : params.row.summary["declaration-rgpd-pc"] === "F"
            ? "La politique de confidentialité n'a pas été trouvée"
            : null;
        if (grade) {
          return (
            <GradeBadge
              showCheckOnSuccess
              hideLabelOnWarning
              label={grade}
              warning={warning}
              title={`Voir les détails de la conformité juridique pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/best-practices/#declaration-rgpd`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("dsfr")) {
    columns.push({
      ...defaultColumnsProps,
      field: "dsfr",
      width: 80,
      headerName: `DSFR`,
      valueGetter: (params) => {
        return params.row.summary.dsfrGrade || "";
      },
      renderCell: (params) => {
        if (!isToolEnabled("dsfr", params.row.url)) return <IconUnknown />;
        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge
              showCheckOnSuccess
              showWarningOnError
              label={grade}
              title={`Voir les détails de la détection du design système de l'état pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              linkProps={{
                href: `/url/${slugifyUrl(params.row.url)}/best-practices/#dsfr`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("ecoindex")) {
    columns.push({
      ...defaultColumnsProps,
      field: "ecoindex",
      headerName: `Eco-index`,
      valueGetter: (params) => {
        return params.row.summary.ecoindexGrade || "";
      },
      renderCell: (params) => {
        if (!isToolEnabled("ecoindex", params.row.url)) return <IconUnknown />;
        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails de l'éco-index pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={grade}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/best-practices/#ecoindex`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("lighthouse")) {
    columns = columns.concat([
      {
        ...defaultColumnsProps,
        field: "accessibility",
        type: "number",
        headerName: `Tests auto accessibilité`,
        description:
          "Bonnes pratiques en matière d'accessibilité web...... ⚠️ Ne couvre que ~20% des critères du RGAA",
        width: 150,
        valueGetter: (params) => {
          return params.row.summary.lighthouse_accessibility || 0;
        },
        renderCell: (params) => {
          if (!isToolEnabled("ecoindex", params.row.url))
            return <IconUnknown />;
          let grade = "F";
          let severity: AlertProps.Severity = "error";
          const value = params.row.summary[`lighthouse_accessibility`];
          if (!value) return <IconUnknown />;

          if (value >= 1) {
            grade = "A";
            severity = "success";
          } else if (value >= 0.85) {
            grade = "C";
            severity = "warning";
          } else if (value >= 0.7) {
            grade = "F";
            severity = "error";
          }

          return (
            <GradeBadge
              title={`Voir les détails lighthouse pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={grade}
              severity={severity}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/best-practices/#lighthouse`,
              }}
            />
          );
        },
      },
      {
        ...defaultColumnsProps,
        field: "performance",
        type: "number",
        headerName: `WebPerf`,
        description: "Performances de chargement des pages web (LightHouse)",
        valueGetter: (params) => {
          return params.row.summary.lighthouse_performance;
        },
        renderCell: (params) => {
          if (!isToolEnabled("ecoindex", params.row.url))
            return <IconUnknown />;
          return (
            <GradeBadge
              showCheckOnSuccess
              title={`Voir les détails lighthouse pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              label={params.row.summary["lighthouse_performanceGrade"]}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/best-practices/#lighthouse`,
              }}
            />
          );
        },
      },
      {
        ...defaultColumnsProps,
        field: "seo",
        type: "number",
        headerName: `SEO`,
        description:
          "Bonnes pratiques en matière de référencement naturel (LightHouse)",
        valueGetter: (params) => {
          return params.row.summary.lighthouse_seo || 0;
        },
        renderCell: (params) => {
          if (!isToolEnabled("ecoindex", params.row.url))
            return <IconUnknown />;
          return (
            <GradeBadge
              showCheckOnSuccess
              title={`Voir les détails lighthouse pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              label={params.row.summary["lighthouse_seoGrade"]}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/best-practices/#lighthouse`,
              }}
            />
          );
        },
      },
    ]);
  }

  if (isToolEnabled("testssl")) {
    columns.push({
      ...defaultColumnsProps,
      field: "testssl",
      headerName: `SSL`,
      type: "string",
      valueGetter: (params) => {
        let grade = params.row.summary.testsslGrade;
        if (
          params.row.summary.testsslExpireSoon &&
          params.row.summary.testsslExpireDate
        ) {
          grade = "F";
        }
        return grade;
      },
      renderCell: (params) => {
        if (!isToolEnabled("testssl", params.row.url)) return <IconUnknown />;
        const grade = params.value;
        let warning;
        if (
          params.row.summary.testsslExpireSoon &&
          params.row.summary.testsslExpireDate
        ) {
          warning = `Expire le : ${format(
            new Date(params.row.summary.testsslExpireDate),
            "dd/MM/yyyy"
          )}`;
        }
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails du test SSL pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              hideLabelOnWarning
              label={grade}
              warning={warning}
              linkProps={{
                href: `/url/${slugifyUrl(params.row.url)}/securite/#testssl`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("http")) {
    columns.push({
      ...defaultColumnsProps,
      field: "http",
      width: 80,
      headerName: `HTTP`,
      description:
        "Bonnes pratiques de configuration HTTP (Mozilla observatory)",
      type: "string",
      valueGetter: (params) => {
        return (
          params.row.summary.httpGrade &&
          params.row.summary.httpGrade.substring(0, 1)
        );
      },
      renderCell: (params) => {
        if (!isToolEnabled("http", params.row.url)) return <IconUnknown />;
        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails Mozilla HTTP Obervatory pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={grade}
              linkProps={{
                href: `/url/${slugifyUrl(params.row.url)}/securite/#http`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("updownio")) {
    columns.push({
      ...defaultColumnsProps,
      field: "updownio",
      headerName: `Disponibilité`,
      description: "Disponibilité du service (updown.io)",
      type: "number",
      valueGetter: (params) => {
        return params.row.summary.uptime;
      },
      renderCell: (params) => {
        const grade = params.value;
        if (!isToolEnabled("updownio", params.row.url)) return <IconUnknown />;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails updown.io pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={params.row.summary.uptimeGrade}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/disponibilite/#updownio`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });

    columns.push({
      ...defaultColumnsProps,
      field: "apdex",
      headerName: `ApDex`,
      width: 80,
      description:
        "Apdex: Application Performance Index : indice de satisfaction des attentes de performance (updown.io)",
      type: "number",
      valueGetter: (params) => {
        return params.row.summary.apdex || 0;
      },
      renderCell: (params) => {
        if (!isToolEnabled("updownio", params.row.url)) return <IconUnknown />;
        return (
          <GradeBadge
            title={`Voir les détails upwdown.io pour l'url ${slugifyUrl(
              params.row.url
            )}`}
            showCheckOnSuccess
            label={params.row.summary.apdexGrade}
            linkProps={{
              href: `/url/${slugifyUrl(
                params.row.url
              )}/disponibilite/#updownio`,
            }}
          />
        );
      },
    });
  }

  if (isToolEnabled("nuclei")) {
    columns.push({
      ...defaultColumnsProps,
      field: "nuclei",
      headerName: `Nuclei`,
      description: "Vulnérabilités applicatives detectées avec Nucléi",
      type: "number",
      valueGetter: (params) => {
        return (params.row.nuclei && params.row.nuclei.length) || 0;
      },
      renderCell: (params) => {
        if (!isToolEnabled("nuclei", params.row.url)) return <IconUnknown />;
        return (
          <GradeBadge
            showCheckOnSuccess
            title={`Voir les détails nuclei pour l'url ${slugifyUrl(
              params.row.url
            )}`}
            label={(params.row.nuclei && params.row.nuclei.length) || 0}
            linkProps={{
              href: `/url/${slugifyUrl(params.row.url)}/securite/#nuclei`,
            }}
          />
        );
      },
    });
  }

  if (isToolEnabled("dependabot")) {
    columns.push({
      ...defaultColumnsProps,
      field: "dependabot",
      headerName: `Vulnérabilités`,
      description:
        "Vulnérabilités applicatives detectées dans les dépendances du code (dependabot)",
      type: "number",
      valueGetter: (params) => {
        return params.row.summary.dependabotCount || 0;
      },
      renderCell: (params) => {
        if (!isToolEnabled("dependabot", params.row.url))
          return <IconUnknown />;
        return (
          <GradeBadge
            showCheckOnSuccess
            title={`Voir les détails dependabot pour l'url ${slugifyUrl(
              params.row.url
            )}`}
            label={params.row.summary.dependabotGrade}
            linkProps={{
              href: `/url/${slugifyUrl(params.row.url)}/securite/#dependabot`,
            }}
          />
        );
      },
    });
  }

  if (isToolEnabled("codescan")) {
    columns.push({
      ...defaultColumnsProps,
      field: "codescan",
      headerName: `CodeQL`,
      description:
        "Potentielles vulnérabilités ou erreurs detectées dans les codes sources (CodeQL)",
      type: "number",
      valueGetter: (params) => {
        return params.row.summary.codescanCount || 0;
      },
      renderCell: (params) => {
        if (!isToolEnabled("codescan", params.row.url)) return <IconUnknown />;
        return (
          <GradeBadge
            title={`Voir les détails CodeQL pour l'url ${slugifyUrl(
              params.row.url
            )}`}
            showCheckOnSuccess
            label={params.row.summary.codescanGrade}
            linkProps={{
              href: `/url/${slugifyUrl(params.row.url)}/securite/#codescan`,
            }}
          />
        );
      },
    });
  }

  if (isToolEnabled("nmap")) {
    columns.push({
      ...defaultColumnsProps,
      field: "nmap",
      headerName: `nmap`,
      description: "Vulnérabilités réseau detectées par Nmap",
      type: "string",
      valueGetter: (params) => {
        return params.row.summary.nmapGrade;
      },
      renderCell: (params) => {
        if (!isToolEnabled("nmap", params.row.url)) return <IconUnknown />;
        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails nmap pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={grade}
              linkProps={{
                href: `/url/${slugifyUrl(params.row.url)}/securite/#nmap`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
    columns.push({
      ...defaultColumnsProps,
      field: "nmap2",
      headerName: `ports`,
      description: "Ports TCP ouverts détectés par nmap",
      type: "number",
      valueGetter: (params) => {
        return params.row.summary.nmapOpenPortsCount || 0;
      },
      renderCell: (params) => {
        if (!isToolEnabled("nmap", params.row.url)) return <IconUnknown />;
        const grade = params.row.summary.nmapOpenPortsGrade;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails nmap pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={grade}
              linkProps={{
                href: `/url/${slugifyUrl(params.row.url)}/securite/#nmap`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("thirdparties")) {
    columns.push({
      ...defaultColumnsProps,
      field: "thirdparties",
      headerName: `Trackers`,
      description:
        "Nombre de scripts externes détectés. Certains scripts externes légitimes peuvent être considérés comme trackers.",
      type: "number",
      valueGetter: (params) => {
        return params.row.summary.trackersCount || 0;
      },
      renderCell: (params) => {
        if (!isToolEnabled("thirdparties", params.row.url))
          return <IconUnknown />;
        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails des trackers pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={params.row.summary.trackersCount}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/best-practices/#thirdparties`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
    columns.push({
      ...defaultColumnsProps,
      field: "cookies",
      headerName: `Cookies`,
      description: "Nombre de cookies présents",
      type: "number",
      valueGetter: (params) => {
        return params.row.summary.cookiesCount || 0;
      },
      renderCell: (params) => {
        if (!isToolEnabled("thirdparties", params.row.url))
          return <IconUnknown />;
        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails des cookies pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={params.row.summary.cookiesCount}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/best-practices/#cookies`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("stats")) {
    columns.push({
      ...defaultColumnsProps,
      field: "stats",
      headerName: `Stats`,
      description: "Présence de la page des statistiques",
      type: "string",
      valueGetter: (params) => {
        return params.row.summary.statsGrade || "";
      },
      renderCell: (params) => {
        if (!isToolEnabled("stats", params.row.url)) return <IconUnknown />;
        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails des standards pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              showWarningOnError
              label={params.value}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/best-practices/#stats`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("budget_page")) {
    columns.push({
      ...defaultColumnsProps,
      field: "budget",
      headerName: `Budget`,
      description: "Présence de la page du budget",
      type: "string",
      valueGetter: (params) => {
        return params.row.summary.budgetPageGrade || "";
      },
      renderCell: (params) => {
        if (!isToolEnabled("budget_page", params.row.url))
          return <IconUnknown />;
        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails des standards pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              showWarningOnError
              label={params.value}
              linkProps={{
                href: `/url/${slugifyUrl(
                  params.row.url
                )}/best-practices/#budget`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("404")) {
    columns.push({
      ...defaultColumnsProps,
      field: "404",
      headerName: `404`,
      description: "Détection de liens brisés",
      type: "number",
      valueGetter: (params) => {
        const count = params.row.summary["404"] || null;
        return count === "A+" ? 0 : count;
      },
      renderCell: (params) => {
        if (!isToolEnabled("404", params.row.url)) return <IconUnknown />;
        const grade =
          params.value === "A+" || params.value === 0 ? "A" : params.value;
        return (
          (grade && (
            <GradeBadge
              title={`Voir les détails des pages en 404 pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={grade}
              linkProps={{
                href: `/url/${slugifyUrl(params.row.url)}/best-practices/#404`,
              }}
            />
          )) || <IconUnknown />
        );
      },
    });
  }

  if (isToolEnabled("trivy")) {
    columns.push({
      ...defaultColumnsProps,
      field: "trivy",
      headerName: `Trivy`,
      description: "Vulnérabilités Trivy",
      type: "number",
      valueGetter: (params) => {
        return params.row.summary.trivyGrade;
      },
      renderCell: (params) => {
        if (!isToolEnabled("trivy", params.row.url)) return <IconUnknown />;
        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails trivy pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={grade}
              linkProps={{
                href: `/url/${slugifyUrl(params.row.url)}/securite/#trivy`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  if (isToolEnabled("sonarcloud")) {
    columns.push({
      ...defaultColumnsProps,
      field: "sonarcloud",
      headerName: `Sonarcloud`,
      description: "Scan de code SonarCloud.io",
      type: "number",
      valueGetter: (params) => {
        return params.row.summary.sonarcloudGrade;
      },
      renderCell: (params) => {
        if (!isToolEnabled("sonarcloud", params.row.url))
          return <IconUnknown />;
        const grade = params.value;
        if (grade) {
          return (
            <GradeBadge
              title={`Voir les détails sonarcloud pour l'url ${slugifyUrl(
                params.row.url
              )}`}
              showCheckOnSuccess
              label={grade}
              linkProps={{
                href: `/url/${slugifyUrl(params.row.url)}/securite/#sonarcloud`,
              }}
            />
          );
        }
        return <IconUnknown />;
      },
    });
  }

  const filterBy = (key) => (item, idx, arr) =>
    !arr.slice(idx + 1).find((r) => item[key] === r[key]);

  const tableData =
    (report &&
      report.filter(filterBy("url")).map((report) => {
        return {
          id: report.url,
          ...report,
        };
      })) ||
    [];

  const ROWS_COUNT = 100;

  const tableProps = {
    rows: tableData,
    columns,
  };
  return (
    (report && (
      <DataGrid
        {...tableProps}
        autoHeight={true}
        disableVirtualization
        disableColumnMenu={true}
        disableDensitySelector={true}
        rowSelection={false}
        hideFooterPagination={false}
        hideFooter={tableData.length < ROWS_COUNT}
        localeText={{
          MuiTablePagination: { labelRowsPerPage: "Lignes par page" },
        }}
        pagination={true}
      />
    )) ||
    null
  );
};
