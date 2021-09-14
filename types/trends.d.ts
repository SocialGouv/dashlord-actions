type UrlMetricsHistoryValue = { date: string; value: string | number };
type UrlMetricsHistoryValues = Record<string, UrlMetricsHistoryValue[]>;


type Trends = Record<string, UrlMetricsHistoryValues>;
