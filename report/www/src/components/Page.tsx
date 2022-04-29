import * as React from "react";
import { Alert } from "@dataesr/react-dsfr";

type PageProps = { data: PageReport; url: string };

export const Page: React.FC<PageProps> = ({ data, url }) => {
    return (

        renderSuccessAlert()
    )

    function renderSuccessAlert() {
        let text = "";

        switch (data.grade) {
            case "A":
                text = "La page a bien été détectée à l'adresse standard : ";
                break;
            case "B":
                text = "La page a bien été détectée à une adresse conforme : ";
                break;
            case "C":
                text = "La page a bien été détectée, mais l'URL n'est pas conforme : ";
                break;
            default:
                return <Alert
                    type="error"
                    title=""
                    description="La page n'a pas été détectée!"
                />

        }
        const urlLink = <a href={`${url}/${data.uri}`}>
            {url}/{data.uri}
        </a>
        return <>{text}{urlLink}</>

    }
}

