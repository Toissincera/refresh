import "./gesture-handler";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerMenu from "./architecture/DrawerMenu";
import { useFonts } from "expo-font";
import { RecoilRoot } from "recoil";
import * as Updates from "expo-updates";
import { Alert } from "react-native";

export default function App() {
  useEffect(() => {
    const checkAndApplyUpdate = async () => {
      Alert.alert("🚀 Checking for OTA update...");
      console.log("🚀 Checking for OTA update...");
      try {
        const update = await Updates.checkForUpdateAsync();
        Alert.alert("✅ Update check completed:");
        console.log("✅ Update check completed:", update);
        if (update.isAvailable) {
          Alert.alert("⬇️ Update is available. Fetching...");
          console.log("⬇️ Update is available. Fetching...");
          await Updates.fetchUpdateAsync();
          Alert.alert("✅ Update fetched. Reloading...");
          console.log("✅ Update fetched. Reloading...");
          await Updates.reloadAsync();
        } else {
          Alert.alert("⚠️ No update available.");
          console.log("⚠️ No update available.");
        }
      } catch (e) {
        Alert.alert("❌ OTA update error:", e.message);
        console.log("❌ OTA update error:", e.message);
      }
    };

    checkAndApplyUpdate();
  }, []);
  const [fontsLoaded] = useFonts({
    NunitoBlack: require("./assets/fonts/Nunito-Black.ttf"),
    NunitoExtraBold: require("./assets/fonts/Nunito-ExtraBold.ttf"),
    NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
    NunitoSemiBold: require("./assets/fonts/Nunito-SemiBold.ttf"),
    Nunito: require("./assets/fonts/Nunito-Regular.ttf"),
    NunitoLight: require("./assets/fonts/Nunito-Light.ttf"),
    NunitoExtraLight: require("./assets/fonts/Nunito-ExtraLight.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <DrawerMenu />
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}
