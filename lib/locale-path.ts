export function getAlternateLocalePath(pathname: string) {
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  const isChinesePath =
    normalizedPath === "/zh" || normalizedPath.startsWith("/zh/");

  if (isChinesePath) {
    const englishPath = normalizedPath.replace(/^\/zh(?=\/|$)/, "");
    return englishPath || "/";
  }

  if (normalizedPath === "/") {
    return "/zh";
  }

  return `/zh${normalizedPath}`;
}
