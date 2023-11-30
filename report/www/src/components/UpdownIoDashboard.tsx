import { slugifyUrl, smallUrl } from '../utils';
import { Panel } from './Panel';
import { UpdownIo } from './UpdownIo';
import Link from 'next/link';

export interface UpdownIoDashboardProps {
    report: DashLordReport;
    updownioStatusPage?: string;
}

export const UpdownIoDashboard = ({ report, updownioStatusPage }: UpdownIoDashboardProps) => {
    return <Panel title="Disponibilité et temps de réponse" url={updownioStatusPage} urlText='Status page Updown.io' isExternal>
        {report.map(urlReport => {
            const curentEncodedUrl = `${encodeURIComponent(slugifyUrl(urlReport.url))}`;
            const currentSmallUrl = smallUrl(urlReport.url);
            return <UpdownIo
                    key={urlReport.url}
                    data={urlReport.updownio}
                    url={urlReport.url}
                    title={
                        <Link
                            prefetch={false}
                            href={`/url/${curentEncodedUrl}/`}>{
                                urlReport.title
                                ? `${urlReport.title} (${currentSmallUrl})`
                                : currentSmallUrl
                            }</Link>
                    }
                />
        })}
    </Panel>;
};