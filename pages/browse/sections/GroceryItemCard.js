import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";

export default function GroceryItemCard({ name1, name2, imgsrc }) {
  return (
    <View style={sx.parent}>
      <ImageBackground
        source={imgsrc}
        resizeMode="cover"
        style={sx.image}
      />
      <Text style={sx.tag}>{name1 || "??"}</Text>
      <Text style={sx.tag}>{name2 || ""}</Text>
    </View>
  );
}

var sx = StyleSheet.create({
  parent: {
    width: "25%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 6,
  },
  imgParent: {
    backgroundColor: "rgb(155, 188, 242)",
    borderRadius: 6,
  },
  image: { width: "100%", aspectRatio: 1 },
  tag: { fontFamily: "NunitoBold", fontSize: 16 },
});
