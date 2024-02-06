import { formatDistanceToNow, differenceInDays, format } from "date-fns";
import { fr } from "@codegouvfr/react-dsfr";
import frLocale from "date-fns/locale/fr";

import { AlertProps } from "@codegouvfr/react-dsfr/Alert";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { CSSProperties } from "react";

// badge that displya "since xxx" and appropriate colors
export const BadgeUpdatedAt = ({
  date,
  style,
}: {
  date: string;
  style: CSSProperties;
}) => {
  if (!date) return;
  const startDate = new Date(date);
  const lagInDays = differenceInDays(new Date(), startDate);
  let severity: AlertProps.Severity = "info";
  if (lagInDays > 60) {
    severity = "error";
  } else if (lagInDays > 30) {
    severity = "warning";
  }
  return (
    <Badge
      severity={severity}
      noIcon
      as="span"
      style={{ verticalAlign: "top", ...style }}
    >
      <i
        className={fr.cx("fr-icon-time-fill", "fr-icon--sm", "fr-mr-1v")}
        title={`Mis à jour le ${format(new Date(startDate), "dd/M/yyyy")}`}
      />
      {formatDistanceToNow(new Date(startDate), {
        locale: frLocale,
      })}
    </Badge>
  );
};
