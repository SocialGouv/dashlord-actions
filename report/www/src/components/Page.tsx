import * as React from "react";
import { Alert } from "@dataesr/react-dsfr";

type PageProps = { data: PageReport; url: string; uri?: string };

const grades = {
  A: "La page a bien été détectée à l'adresse standard : ",
  B: "La page a bien été détectée à une adresse conforme : ",
  C: "La page a bien été détectée, mais l'URL n'est pas conforme : ",
};

export const Page: React.FC<PageProps> = ({ data, url, uri }) => {
  const gradeMessage = grades[data.grade];

  if (!gradeMessage) {
    return (
      <Alert
        type="error"
        title=""
        description={`La page n'a pas été détectée! Ajoutez-la sur ${url}/${
          data.uri || uri
        }`}
      />
    );
  }

  return (
    <Alert
      type="success"
      title=""
      description={
        <>
          {gradeMessage}
          <a href={`${url}/${data.uri}`}>
            {url}/{data.uri}
          </a>
        </>
      }
    />
  );
};
