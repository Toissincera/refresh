import "dotenv/config";

export default {
  expo: {
    name: "refresh",
    slug: "refresh",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      url: "https://u.expo.dev/edbbecf0-6a13-4a19-a190-874cdf3c46a6",
    },
    ios: {
      runtimeVersion: {
        policy: "appVersion",
      },
      supportsTablet: true,
    },
    android: {
      runtimeVersion: "1.0.0",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.toissincera.refresh",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    assetBundlePatterns: ["**/*"],
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: "edbbecf0-6a13-4a19-a190-874cdf3c46a6",
      },
    },
  },
};
