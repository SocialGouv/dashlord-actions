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
  getLatestPhase,
  phaseSeverities,
} from "../../src/components/BetagouvInfo";

const report: DashLordReport = require("../../src/report.json");

type SummaryConfig = {
  title: string;
  neededTool: DashlordTool;
  columns: GridColDef[];
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
              <Link
                prefetch={false}
                title={`Voir la page de stats de l'url ${slugifyUrl(
                  params.row.url
                )}`}
                href={params.row.stats.url + "/" + params.row.stats.uri}
                target="_blank"
              >
                {params.row.stats.uri}
              </Link>
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
    columns: [
      {
        ...defaultColumnsProps,
        align: "center",
        headerAlign: "center",
        field: "stats",
        headerName: `Page de budget`,
        width: 400,
        valueGetter: (params) =>
          (params.row.budget && params.row.budget.grade) || "F",
        renderCell: (params) => {
          if (params.value === "A") {
            return (
              <Link
                prefetch={false}
                title={`Voir la page de budget de l'url ${slugifyUrl(
                  params.row.url
                )}`}
                href={params.row.budget.url + "/" + params.row.budget.uri}
                target="_blank"
              >
                /{params.row.budget.uri}
              </Link>
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
  const summaryConfig = summaryConfigs[id];
  const categories = Array.from(
    new Set(report.map((url) => url.category).filter(Boolean))
  ).sort();

  const tableData = (
    category ? report.filter((url) => url.category === category) : report
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
    isToolEnabled("betagouv") && getPhaseColumn(),
    ...summaryConfig.columns,
  ].filter(Boolean);
  return (
    <>
      <Head>
        <title>
          Rapport {summaryConfig.title} - {dashlordConfig.title}
        </title>
      </Head>
      <h1>{summaryConfig.title}</h1>
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
