import "dotenv/config";
import { ExpoConfig, ConfigContext } from "expo/config";

function getExtension(variant: string): Partial<ExpoConfig> {
  if (variant === "DEVELOPMENT") {
    return {
      ios: {
        bundleIdentifier: "com.seek.seekapp.dev",
        config: {
          googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
        },
      },
      android: {
        package: "com.seek.seekapp.dev",
        config: {
          googleMaps: {
            apiKey: process.env.GOOGLE_MAPS_API_KEY!,
          },
        },
      },
    };
  }
  if (variant === "PRODUCTION") {
    return {
      ios: {
        config: {
          googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
        },
      },
      android: {
        config: {
          googleMaps: {
            apiKey: process.env.GOOGLE_MAPS_API_KEY!,
          },
        },
      },
    };
  }
  throw new Error(`Invalid variant: ${variant}`);
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const extension = getExtension(process.env.RELEASE ?? "DEVELOPMENT");

  return {
    ...config,
    name: "seek-app",
    slug: "seek-app",
    ios: {
      ...config.ios,
      ...extension.ios,
    },
    android: {
      ...config.android,
      ...extension.android,
    },
  };
};
