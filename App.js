import "./gesture-handler";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerMenu from "./architecture/DrawerMenu";
import { useFonts } from "expo-font";
import { RecoilRoot } from "recoil";

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoBlack: require("./assets/fonts/Nunito-Black.ttf"),
    NunitoExtraBold: require("./assets/fonts/Nunito-ExtraBold.ttf"),
    NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
    NunitoSemiBold: require("./assets/fonts/Nunito-SemiBold.ttf"),
    Nunito: require("./assets/fonts/Nunito-Regular.ttf"),
    NunitoLight: require("./assets/fonts/Nunito-Light.ttf"),
    Nunito1ExtraLight: require("./assets/fonts/Nunito-ExtraLight.ttf"),
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
