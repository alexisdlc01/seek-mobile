import { Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

// Closes the web popup when Checkout returns here.
WebBrowser.maybeCompleteAuthSession();

// Return link of the hosted Checkout (seekapp://pay?checkout=...). The screen that
// started the payment confirms it and shows the result, so go back to it; with no
// history (cold start) land on the Rent tab.
export default function PayReturn() {
  const router = useRouter();
  const canGoBack = router.canGoBack();
  useEffect(() => {
    if (canGoBack) router.back();
  }, [canGoBack, router]);
  return canGoBack ? null : <Redirect href="/(app)/(tabs)/rent" />;
}
