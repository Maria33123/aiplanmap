export function getAlternateLocalePath(pathname: string) {
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const isChinese = normalizedPath === "/zh" || normalizedPath.startsWith("/zh/");

  if (isChinese) {
    const englishPath = normalizedPath.replace(/^\/zh(?=\/|$)/, "");
    return englishPath || "/";
  }

  if (normalizedPath === "/") {
    return "/zh";
  }

  if (normalizedPath === "/finder") {
    return "/zh";
  }

  if (
    normalizedPath === "/blog" ||
    normalizedPath.startsWith("/blog/") ||
    normalizedPath === "/platform-notice"
  ) {
    return `/zh${normalizedPath}`;
  }

  return "/zh";
}
