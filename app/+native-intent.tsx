
type RedirectParams = { path: string, initial: boolean };

export function redirectSystemPath({
  path,
}: RedirectParams) {
  if (
    path === "/" ||
    path.startsWith("exp://") ||
    path.startsWith("exp+") ||
    path.includes("expo-development-client")
  ) {
    return "/";
  }

  if (path.startsWith("seekapp://link/")) {
    return path.replace("seekapp://link", "");
  } else if (path.startsWith("https://www.seekapp.uk/link/")) {
    return path.replace("https://www.seekapp.uk/link", "");
  }

  return "/";
}
