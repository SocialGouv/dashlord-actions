import * as React from "react";
import Alert from "@codegouvfr/react-dsfr/Alert";

type PageProps = { data: PageReport; url: string };

const grades = {
  A: "La page a bien été détectée : ",
  B: "La page a bien été détectée : ",
  C: "La page a bien été détectée : ",
};

export const Page: React.FC<PageProps> = ({ data, url }) => {
  const gradeMessage = grades[data.grade];

  if (!gradeMessage) {
    return (
      <Alert
        severity="error"
        title=""
        description={`La page n'a pas été détectée! Ajoutez-la sur ${url}`}
      />
    );
  }

  return (
    <Alert
      severity="success"
      title=""
      description={
        <>
          {gradeMessage}
          <a href={url}>{url}</a>
        </>
      }
    />
  );
};
