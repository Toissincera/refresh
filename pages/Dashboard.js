import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { LanguageState, UserState } from "../recoil/atom";

export default function Dashboard() {
  const [user, setUser] = useRecoilState(UserState);
  const [language, setLanguage] = useRecoilState(LanguageState);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiResponse, setAPIResponse] = useState("");

  async function handleLangToggle() {
    try {
      const response = await fetch(
        "https://www.tatd.in/app-api/driver/trusted-driver/switch-language-api.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwt}`,
          },
          body: JSON.stringify({
            action: "update_language",
            current_language: language,
          }),
        }
      );
      const json = await response.json();

      if (json.status_code === "200") {
        setAPIResponse(json);
        setLanguage(json.current_language);
      } else if (json.status_code === "401") {
        setErrorMessage("Invalid request");
      } else {
        setAPIResponse(json);
        setErrorMessage("Language unavailable, network issue");
      }
    } catch (error) {
      setAPIResponse(json);
      setErrorMessage("Request failed. Please try again later.");
    }
  }
  return (
    <ScrollView style={sx.parent}>
      <Text style={sx.header}>
        {language === "english"
          ? "Welcome back, Driver"
          : "Swagatam aur namaste, Driver"}
      </Text>
      <Text style={sx.body}>
        {language === "english"
          ? `User info is: ${JSON.stringify(user, null, 16)}`
          : `Jankari hai: ${JSON.stringify(user, null, 16)}`}
      </Text>
      <View style={sx.langToggle}>
        <Button
          title="Toggle"
          onPress={handleLangToggle}
        ></Button>
      </View>
      <Text>{errorMessage}</Text>
      <Text style={sx.body}>{JSON.stringify(apiResponse)}</Text>
      <View style={sx.footer}></View>
    </ScrollView>
  );
}

var sx = StyleSheet.create({
  parent: {
    paddingVertical: 36,
    paddingHorizontal: 12,
    backgroundColor: "ghostwhite",
    flex: 1,
  },
  header: {
    marginVertical: 8,
    fontWeight: 600,
    fontSize: 20,
    textAlign: "center",
  },
  body: {
    marginVertical: 16,
    fontWeight: 400,
    fontSize: 10,
  },
  input: { padding: 8, borderWidth: 2, borderRadius: 4 },
  langToggle: { width: 240, flexDirection: "row" },
  footer: { height: 24, width: 240, backgroundColor: "grey" },
});
