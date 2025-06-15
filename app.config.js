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
      url: "otaone",
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
      supabaseUrl: "https://lcfoigtqlfchauzgqsjw.supabase.co",
      supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZm9pZ3RxbGZjaGF1emdxc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTc1MzcsImV4cCI6MjA2NTM3MzUzN30.L-l8YAeHcO5-RBmB6ezYJfjSY6CBDJaDy_P93KEO2lw",
      supabaseUrlPROTECTED: process.env.SUPABASE_URL,
      supabaseAnonKeyPROTECTED: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: "edbbecf0-6a13-4a19-a190-874cdf3c46a6",
      },
    },
  },
};
