const productionSiteUrl = "https://www.aiplanmap.com";

function normalizeSiteUrl(value: string) {
  const normalizedValue = /^https?:\/\//i.test(value)
    ? value
    : `https://${value}`;
  return new URL(normalizedValue).origin.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelSiteUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  return normalizeSiteUrl(configuredSiteUrl || vercelSiteUrl || productionSiteUrl);
}

export function getAbsoluteUrl(pathname: string) {
  const normalizedPath = pathname.replace(/^\/+/, "");
  return new URL(normalizedPath, `${getSiteUrl()}/`).toString();
}
