
type RedirectParams = { path: string, initial: boolean };

export function redirectSystemPath({
  path,
}: RedirectParams) {
  console.log("deeplink path", path);
  if (path === "/" || path.startsWith("exp://")) {
    return "/";
  }

  if (path.startsWith('seekapp://link/')) {
    return path.replace("seekapp://link", "");
  } else if (path.startsWith('https://www.seekapp.uk/link/')) {
    return path.replace("https://www.seekapp.uk/link", "");
  }

  console.log("invalid deeplink recieved");
  return "/home";
}
