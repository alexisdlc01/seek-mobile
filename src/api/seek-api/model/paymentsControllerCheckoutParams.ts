/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */

export type PaymentsControllerCheckoutParams = {
/**
 * Where Stripe sends the payer after paying. {CHECKOUT_SESSION_ID} is replaced by Stripe. Must be on the web app (FRONTEND_URL) or the app scheme (seekapp://, seek://); outside production also http://localhost:* and Expo Go (exp://, exps://). Defaults to the web app, or seekapp:// on mobile.
 */
successUrl?: string;
/**
 * Where Stripe sends the payer if they go back.
 */
cancelUrl?: string;
};
