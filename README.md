# Seek mobile

Expo / React Native mobile client for Seek.

## Local setup

1. Install Node.js 20.19 or newer (the version in `.nvmrc` is supported), then run `npm install`.
2. Copy `.env.example` to `.env` and fill in the Google Maps SDK and Places API keys. The native Maps key must be valid for the platform and app identifier being built; the Places key must allow the Places requests used by the app. These keys are embedded in the app, so use appropriately restricted keys, not secrets.
3. Start an accessible Seek backend and set `EXPO_PUBLIC_API_URL` to its URL. `http://localhost:3000` works for a backend on the same Mac when using the iOS simulator. Use `http://10.0.2.2:3000` for the Android emulator, or an address reachable from a physical device for device testing. Backend setup and service credentials are maintained in the backend repository.
4. Install Xcode and an iOS simulator for iOS, or Android Studio and an emulator for Android. Run `npm run ios` or `npm run android` to build and install a development client. Native Maps configuration changes require rebuilding the client.
5. For subsequent sessions run `npm start`, then open the development client. Restart Metro after changing public environment variables. `npm run ios` also starts Metro and opens the app; it uses an already booted simulator or the first available one. Set `IOS_SIMULATOR_NAME` to select a particular simulator. `npm run ios:install` lets Expo prompt for a device.

The app requires native modules and a development build; Expo Go is not sufficient. EAS builds and release updates use the Seek Expo project configured in `app.json` and require access to that project, its credentials, and the corresponding environment variables. Local builds do not require publishing to EAS.

Run `npm run lint` and `npx tsc --noEmit` for static checks.
