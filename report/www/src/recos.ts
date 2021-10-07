import { format } from "date-fns";

export type Reco = {
  type: "error" | "warning";
  content: string;
  tool: DashlordTool;
};

export const getRecommendations = (data: UrlReport): Reco[] => {
  const recos = [] as Reco[];
  /* stats */
  if (data.summary.statsGrade && data.summary.statsGrade !== "A") {
    recos.push({
      type: "error",
      content: "La page /stats n'a pas été détectée",
      tool: "stats",
    });
  }
  /* 404 */
  if (data.summary["404"]) {
    recos.push({
      type: "error",
      content: `Certains liens présents sur le site semblent brisés (${data.summary["404"]})`,
      tool: "404",
    });
  }
  /* ssl */
  if (
    data.summary.testsslGrade &&
    !["A", "B", "C", "D", "E", "F"].includes(
      data.summary.testsslGrade.substring(0, 1)
    )
  ) {
    recos.push({
      type: "error",
      content: `Le certificat SSL semble mal configuré (${data.summary.testsslGrade})`,
      tool: "testssl",
    });
  } else if (
    data.summary.testsslGrade &&
    !["A", "B"].includes(data.summary.testsslGrade.substring(0, 1))
  ) {
    recos.push({
      type: "warning",
      content: `Vous pouvez améliorer le niveau de confiance de votre certificat SSL (${data.summary.testsslGrade})`,
      tool: "testssl",
    });
  }
  if (data.summary.testsslExpireSoon && data.summary.testsslExpireDate) {
    recos.push({
      type: "error",
      content: `Le certificat SSL expire le ${format(
        new Date(data.summary.testsslExpireDate),
        "dd/MM/yyyy"
      )}`,
      tool: "testssl",
    });
  }
  /* http */
  if (
    data.summary.httpGrade &&
    ["D", "E", "F"].includes(data.summary.httpGrade.substring(0, 1))
  ) {
    recos.push({
      type: "error",
      content: `Vous pouvez améliorer la sécurité de votre application en ajoutant des headers spécifiques (${data.summary.httpGrade})`,
      tool: "http",
    });
  } else if (data.summary.httpGrade && data.summary.httpGrade !== "A+") {
    recos.push({
      type: "warning",
      content: `Vous pouvez encore améliorer la sécurité de votre application en ajoutant des headers spécifiques (${data.summary.httpGrade})`,
      tool: "http",
    });
  }
  /* updownio */
  if (data.summary.apdex && data.summary.apdex < 0.95) {
    recos.push({
      type: "warning",
      content: `Vous pouvez améliorer les temps de réponse de votre application (APDEX=${data.summary.apdex})`,
      tool: "updownio",
    });
  }
  /* lighthouse */
  if (
    data.summary.lighthouse_accessibilityGrade &&
    data.summary.lighthouse_accessibilityGrade != "A"
  ) {
    recos.push({
      type: "warning",
      content: `Google LightHouse peut vous aider à améliorer les bases d'accessibilité de votre application (${data.summary.lighthouse_accessibilityGrade})`,
      tool: "updownio",
    });
  }
  if (
    (data.summary["lighthouse_best-practicesGrade"] &&
      data.summary["lighthouse_best-practicesGrade"] != "A") ||
    (data.summary.lighthouse_performanceGrade &&
      data.summary.lighthouse_performanceGrade != "A")
  ) {
    recos.push({
      type: "warning",
      content: `Google LightHouse peut vous aider à améliorer les performances frontend de votre application (${data.summary["lighthouse_best-practicesGrade"]}, ${data.summary.lighthouse_performanceGrade})`,
      tool: "updownio",
    });
  }
  if (data.summary.lighthouse_seo && data.summary.lighthouse_seoGrade != "A") {
    recos.push({
      type: "warning",
      content: `Google LightHouse peut vous aider à améliorer le référencement naturel (SEO) de votre application (${data.summary.lighthouse_seoGrade})`,
      tool: "updownio",
    });
  }
  /* dependabot */
  if (
    data.summary.dependabotGrade &&
    ["E", "F"].includes(data.summary.dependabotGrade.substring(0, 1))
  ) {
    recos.push({
      type: "error",
      content: `Dependabot signale des dépendances hautement vulnérables (${data.summary.dependabotCount})`,
      tool: "dependabot",
    });
  } else if (
    data.summary.dependabotGrade &&
    ["C", "D"].includes(data.summary.dependabotGrade.substring(0, 1))
  ) {
    recos.push({
      type: "warning",
      content: `Dependabot signale des dépendances moyennement vulnérables (${data.summary.dependabotCount})`,
      tool: "dependabot",
    });
  }

  /* codescan */
  if (
    data.summary.codescanGrade &&
    !["A"].includes(data.summary.codescanGrade.substring(0, 1))
  ) {
    recos.push({
      type: "warning",
      content: `CodeQL signale des potentielles vulnérabilités dans le code source`,
      tool: "codescan",
    });
  }
  /* trackers */
  if (
    data.summary.trackersGrade &&
    !["A", "B"].includes(data.summary.trackersGrade)
  ) {
    recos.push({
      type: "warning",
      content: `Vérifier les scripts externes utilisés (${data.summary.trackersCount})`,
      tool: "dependabot",
    });
  }
  /* cookies */
  if (
    data.summary.cookiesGrade &&
    !["A", "B"].includes(data.summary.cookiesGrade)
  ) {
    recos.push({
      type: "warning",
      content: `Vérifier les cookies utilisés (${data.summary.cookiesCount})`,
      tool: "dependabot",
    });
  }
  /* nmap */
  if (
    data.summary.nmapGrade &&
    ["E", "F"].includes(data.summary.nmapGrade.substring(0, 1))
  ) {
    recos.push({
      type: "error",
      content: `Vérifier le scan NMAP (${data.summary.nmapOpenPortsCount} port ouverts)`,
      tool: "nmap",
    });
  } else if (
    data.summary.nmapOpenPortsCount &&
    data.summary.nmapOpenPortsCount > 3
  ) {
    recos.push({
      type: "warning",
      content: `Vérifier les ports ouverts (${data.summary.nmapOpenPortsCount})`,
      tool: "nmap",
    });
  }
  /* trivy */
  if (
    data.summary.trivyGrade &&
    ["E", "F"].includes(data.summary.trivyGrade.substring(0, 1))
  ) {
    recos.push({
      type: "error",
      content: `Vérifier les vulnérabilités des images docker (${data.summary.trivyGrade})`,
      tool: "trivy",
    });
  }

  return recos;
};
