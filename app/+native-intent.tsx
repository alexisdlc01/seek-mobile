
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

  // Return from the Gmail / Outlook consent screen.
  if (path.startsWith("seekapp://connectors")) {
    return "/connected-email";
  }

  // Return from Stripe Checkout (Android delivers it as a link): pay.tsx goes back to where the payment started.
  if (/^(seekapp:\/\/)?\/*pay\?checkout=/.test(path)) {
    return "/pay";
  }

  if (path.startsWith("seekapp://link/")) {
    return path.replace("seekapp://link", "");
  } else if (path.startsWith("https://www.seekapp.uk/link/")) {
    return path.replace("https://www.seekapp.uk/link", "");
  }

  return "/";
}
