import * as React from "react";
import Link from "next/link";

import { Alert } from "@dataesr/react-dsfr";

export const Tab = ({ id, selected, index, icon, label, href }) => (
  <li role="presentation" key={id}>
    <Link href={href}>
      <button
        type="button"
        role="tab"
        id={`fr-tab-${index}`}
        aria-selected={selected}
        tabIndex={0}
        aria-controls={`fr-tabpanel-${index}`}
        className="fr-tabs__tab"
      >
        {icon}
        {label}
      </button>
    </Link>
  </li>
);

export const TabContent = ({ id, tabIndex, selected, items }) => (
  <div
    key={id}
    id={`fr-tabpanel-${tabIndex}`}
    className={`fr-tabs__panel ${
      (selected && "fr-tabs__panel--selected") || ""
    }`}
    style={{ paddingTop: 30 }}
    role="tabpanel"
    aria-labelledby={`fr-tab-${tabIndex}`}
    tabIndex={0}
  >
    {selected && items && items.length ? (
      items
    ) : (
      <Alert
        type="error"
        title="warn-no-info"
        description={<>Aucune information trouvée dans cette catégorie</>}
      />
    )}
  </div>
);
