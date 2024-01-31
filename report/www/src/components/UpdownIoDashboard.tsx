import { fr } from "@codegouvfr/react-dsfr";
import { slugifyUrl, smallUrl } from "../utils";
import { UpdownIo } from "./UpdownIo";
import Link from "next/link";

export interface UpdownIoDashboardProps {
  report: DashLordReport;
  updownioStatusPage?: string;
}

export const UpdownIoDashboard = ({
  report,
  updownioStatusPage,
}: UpdownIoDashboardProps) => {
  return (
    <>
      <h1>Disponibilité et temps de réponse</h1>
      {updownioStatusPage && (
        <>
          Consulter le tableau de bord updown.io :{" "}
          <Link
            className={fr.cx("fr-link")}
            href={updownioStatusPage}
            target="_blank"
          >
            {updownioStatusPage}
          </Link>
          <br />
          <br />
        </>
      )}

      {report.map((urlReport) => {
        const curentEncodedUrl = `${encodeURIComponent(
          slugifyUrl(urlReport.url)
        )}`;
        const currentSmallUrl = smallUrl(urlReport.url);
        return (
          <UpdownIo
            key={urlReport.url}
            data={urlReport.updownio}
            url={urlReport.url}
            title={
              <Link prefetch={false} href={`/url/${curentEncodedUrl}/`}>
                {urlReport.title
                  ? `${urlReport.title} (${currentSmallUrl})`
                  : currentSmallUrl}
              </Link>
            }
          />
        );
      })}
    </>
  );
};
