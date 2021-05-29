/// <reference path="./index.d.ts" />

type UrlReportSummary = {
    testsslGrade?: string;
    codescanCount?: number;
    codescanGrade?: string;
    dependabotCount?: number;
    dependabotGrade?: string;
    httpGrade?: string;
    lighthouse_performance?: number;
    lighthouse_performanceGrade?: string;
    lighthouse_seo?: number;
    lighthouse_seoGrade?: string;
    lighthouse_accessibility?: number;
    lighthouse_accessibilityGrade?: string;
    nmapCount?: number;
    nmapGrade?: string;
    trackersCount?: number;
    trackersGrade?: string;
    cookiesCount?: number;
    cookiesGrade?: string;
    uptime?: number;
    uptimeGrade?: string;
    apdex?: number;
    apdexGrade?: string;
}