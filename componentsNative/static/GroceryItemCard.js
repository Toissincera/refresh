import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function GroceryItemCard(props) {
  return (
    <View style={sx.parent}>
      <View style={sx.imgParent}>
        <Image source={require("../../assets/favicon.png")} />
      </View>
      <Text>{props.categoryName || "??Category??"}</Text>
    </View>
  );
}

var sx = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imgParent: {
    backgroundColor: "rgb(155, 188, 242)",
    borderRadius: 6,
  },
});
