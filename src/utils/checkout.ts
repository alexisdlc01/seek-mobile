import {
  paymentsControllerCheckout,
  paymentsControllerConfirmCheckout,
} from "@/src/api/seek-api/payments";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export type CheckoutOutcome = "paid" | "pending" | "cancelled";

/**
 * Pays one payment (rent or holding deposit) with Stripe's hosted Checkout in an
 * auth session, then confirms it. Throws the API error if the checkout can't start.
 */
export async function payWithCheckout(paymentId: string): Promise<CheckoutOutcome> {
  const back = Linking.createURL("/pay", { queryParams: { checkout: "success", payment: paymentId } });
  // Stripe fills in {CHECKOUT_SESSION_ID}, so it must stay literal (not URL-encoded).
  const successUrl = `${back}&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = Linking.createURL("/pay", { queryParams: { checkout: "cancelled", payment: paymentId } });
  const checkout = await paymentsControllerCheckout(paymentId, { successUrl, cancelUrl });
  // Already paid (the list was stale): nothing to open.
  if (checkout.status === "PAID") return "paid";
  let sessionId = checkout.sessionId;
  if (checkout.mode === "stripe" && checkout.url) {
    const result = await WebBrowser.openAuthSessionAsync(checkout.url, back);
    if (result.type !== "success") return "cancelled";
    const params = Linking.parse(result.url).queryParams;
    // iOS closes the session on any seekapp:// URL, including Stripe's cancel return.
    if (params?.checkout?.toString() === "cancelled") return "cancelled";
    sessionId = params?.session_id?.toString() ?? sessionId;
  }
  // Simulated mode is already paid; there is no session to confirm.
  const status = sessionId
    ? (await paymentsControllerConfirmCheckout(paymentId, { session_id: sessionId })).status
    : checkout.status;
  return status === "PAID" ? "paid" : "pending";
}
