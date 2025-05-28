import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { LanguageState, UserState } from "../recoil/atom";

export default function Dashboard() {
  const [user, setUser] = useRecoilState(UserState);

  return (
    <View>
      <Text>I am dahsboard</Text>
    </View>
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
