import React, { useState } from "react";
import { Button, View, StyleSheet, Text, ScrollView } from "react-native";
import { useRecoilState } from "recoil";
import { UserState } from "../../recoil/atom";
import GroceryAndKitchen from "./sections/GroceryAndKitchen";

export default function BrowseParent() {
  return (
    <View style={sx.parent}>
      <GroceryAndKitchen />
    </View>
  );
}

var sx = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
