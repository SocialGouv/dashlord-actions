import { useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import Badge from "@codegouvfr/react-dsfr/Badge";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { fr } from "@codegouvfr/react-dsfr";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import dashlordConfig from "@/config.json";
import { isToolEnabled, smallUrl, slugifyUrl } from "../../src/utils";
import Link from "next/link";
import { GradeBadge, IconUnknown } from "../../src/components/GradeBadge";
import {
  phases,
  getLatestPhase,
  phaseSeverities,
} from "../../src/components/BetagouvInfo";

const report: DashLordReport = require("../../src/report.json");

type StatDef = {
  title: string;
  value: (any) => number;
};

type SummaryConfig = {
  title: string;
  neededTool: DashlordTool;
  columns: GridColDef[];
  stats: StatDef[];
};

const defaultColumnsProps = {
  sortable: true,
  width: 120,
  type: "string",
  headerAlign: "left" as const,
  align: "left" as const,
};

const getPhaseColumn = (): GridColDef => ({
  ...defaultColumnsProps,
  field: "phase",
  headerName: `Phase`,
  align: "center",
  headerAlign: "center",
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
          severity={phaseSeverities[latestPhase.label.toLowerCase()] || "info"}
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

const summaryConfigs: Record<string, SummaryConfig> = {
  accessibility: {
    title: "Accessibilité",
    neededTool: "declaration-a11y",
    stats: [
      {
        title: "Déclaration présente",
        value: (rows) =>
          rows.filter(
            (row) => row["declaration-a11y"] && row["declaration-a11y"].mention
          ).length,
      },
      {
        title: "Déclaration absente",
        value: (rows) =>
          rows.filter(
            (row) =>
              !(row["declaration-a11y"] && row["declaration-a11y"].mention)
          ).length,
      },
    ],
    columns: [
      {
        ...defaultColumnsProps,
        align: "center",
        headerAlign: "center",
        field: "mention",
        headerName: `Détection déclaration`,
        width: 400,
        valueGetter: (params) =>
          (params.row["declaration-a11y"] &&
            params.row["declaration-a11y"].mention) ||
          "",
        renderCell: (params) => {
          if (params.value) {
            const text = params.value.replace(/^Accessibilité : /, "");
            if (params.row["declaration-a11y"].declarationUrl) {
              return (
                <Link
                  prefetch={false}
                  title={`Voir la déclaration d'accessiblité de l'url ${slugifyUrl(
                    params.row.url
                  )}`}
                  href={params.row["declaration-a11y"].declarationUrl}
                  target="_blank"
                >
                  {text}
                </Link>
              );
            }
            return text;
          }
          return <GradeBadge showWarningOnError label="F" />;
        },
      },
    ],
  },
  stats: {
    title: "Page de stats",
    neededTool: "stats",
    stats: [
      {
        title: "Stats publiées",
        value: (rows) =>
          rows.filter((row) => row.stats && row.stats.grade === "A").length,
      },
      {
        title: "Stats non publiées",
        value: (rows) =>
          rows.filter((row) => row.stats && row.stats.grade === "F").length,
      },
    ],
    columns: [
      {
        ...defaultColumnsProps,
        align: "center",
        headerAlign: "center",
        field: "stats",
        headerName: `Page de stats`,
        width: 400,
        valueGetter: (params) =>
          (params.row.stats && params.row.stats.grade) || "F",
        renderCell: (params) => {
          if (params.value === "A") {
            return (
              params.row.betagouv &&
              params.row.betagouv.attributes.stats_url && (
                <Link
                  prefetch={false}
                  title={`Voir la page de stats de l'url ${slugifyUrl(
                    params.row.url
                  )}`}
                  href={params.row.betagouv.attributes.stats_url}
                  target="_blank"
                >
                  {params.row.betagouv.attributes.stats_url}
                </Link>
              )
            );
          }
          return <GradeBadge showWarningOnError label="F" />;
        },
      },
    ],
  },
  budget: {
    title: "Publication du budget",
    neededTool: "budget_page",
    stats: [
      {
        title: "Budget publié",
        value: (rows) =>
          rows.filter((row) => row.budget_page && row.budget_page.grade === "A")
            .length,
      },
      {
        title: "Budget non publié",
        value: (rows) =>
          rows.filter(
            (row) =>
              !row.budget_page ||
              (row.budget_page && row.budget_page.grade === "F")
          ).length,
      },
    ],
    columns: [
      {
        ...defaultColumnsProps,
        align: "center",
        headerAlign: "center",
        field: "stats",
        headerName: `Page de budget`,
        width: 400,
        valueGetter: (params) =>
          (params.row.budget_page && params.row.budget_page.grade) || "F",
        renderCell: (params) => {
          if (params.value === "A") {
            return (
              params.row.betagouv &&
              params.row.betagouv.attributes.budget_url && (
                <Link
                  prefetch={false}
                  title={`Voir la page de budget de l'url ${slugifyUrl(
                    params.row.url
                  )}`}
                  href={params.row.betagouv.attributes.budget_url}
                  target="_blank"
                >
                  {params.row.betagouv.attributes.budget_url}
                </Link>
              )
            );
          }
          return <GradeBadge showWarningOnError label="F" />;
        },
      },
    ],
  },
};

const Summary = ({ id }: { id: string }) => {
  const [category, setCategory] = useState(null);
  const [phase, setPhase] = useState(null);
  const summaryConfig = summaryConfigs[id];
  const categories = Array.from(
    new Set(report.map((url) => url.category).filter(Boolean))
  ).sort();

  const tableData = (
    category || phase
      ? report.filter((url) => {
          let matchCategory = category ? url.category === category : true;
          let matchPhase = phase
            ? url.betagouv &&
              url.betagouv.attributes &&
              getLatestPhase(url.betagouv.attributes.phases).id === phase
            : true;
          return matchCategory && matchPhase;
        })
      : report
  ).filter((url) =>
    summaryConfig.neededTool
      ? isToolEnabled(summaryConfig.neededTool, url.url)
      : true
  );

  const ROWS_COUNT = 100;

  const columns = [
    {
      ...defaultColumnsProps,
      field: "url",
      headerName: `URL`,
      width: 400,
      renderCell: (params) =>
        params.value && (
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
    isToolEnabled("betagouv") && getPhaseColumn(),
    ...summaryConfig.columns,
  ].filter(Boolean);

  // console.log(phases, report);
  return (
    <>
      <Head>
        <title>
          Rapport {summaryConfig.title} - {dashlordConfig.title}
        </title>
      </Head>
      <h1>{summaryConfig.title}</h1>

      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-3w")}>
        {summaryConfig.stats.map((stat) => {
          const value = stat.value(tableData);
          return (
            <div
              className={fr.cx("fr-col-3", "fr-m-1w", "fr-p-3w")}
              style={{ textAlign: "center", border: "1px solid #ccc" }}
              key={stat.title}
            >
              <div className={fr.cx("fr-text--lead", "fr-text--heavy")}>
                {stat.title}
              </div>
              <div
                className={fr.cx("fr-text--heavy")}
                style={{ fontSize: "2rem" }}
              >
                {value}
              </div>
            </div>
          );
        })}
      </div>
      <div className={fr.cx("fr-grid-row")}>
        {categories.length > 1 && (
          <Select
            label={null}
            nativeSelectProps={{
              onChange: (event) => setCategory(event.target.value),
            }}
          >
            <option value="">tous les incubateurs</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </Select>
        )}
        {isToolEnabled("betagouv") && (
          <Select
            className={fr.cx("fr-ml-1w")}
            label={null}
            nativeSelectProps={{
              onChange: (event) => setPhase(event.target.value),
            }}
          >
            <option value="">toutes les phases</option>
            {phases.map((phase) => (
              <option value={phase.id} key={phase.id}>
                {phase.label}
              </option>
            ))}
          </Select>
        )}
      </div>
      <DataGrid
        rows={tableData}
        columns={columns}
        autoHeight={true}
        getRowId={(row) => row.url}
        disableVirtualization
        disableColumnMenu={true}
        disableDensitySelector={true}
        rowSelection={false}
        hideFooterPagination={false}
        hideFooter={tableData.length < ROWS_COUNT}
        initialState={{
          sorting: {
            sortModel: [{ field: "phase", sort: "desc" }],
          },
        }}
        localeText={{
          MuiTablePagination: { labelRowsPerPage: "Lignes par page" },
        }}
        pagination={true}
      />
    </>
  );
};

// will be passed to the page component as props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params && (params.id as string);
  return {
    props: { id },
  };
};

// return list of urls to generate
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ["/summary/accessibility", "/summary/stats", "/summary/budget"],
  fallback: false,
});

export default Summary;
