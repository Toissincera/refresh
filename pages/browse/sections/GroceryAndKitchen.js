import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GroceryItemCard from "../../../componentsNative/static/GroceryItemCard";

export default function GroceryAndKitchen() {
  return (
    <View style={sx.parent}>
      <Text style={sx.heading}>Grocery & Kitchen</Text>
      {/* First Row */}
      <View style={sx.row}>
        <GroceryItemCard categoryName="Vegetables & Fruits" />
        <GroceryItemCard categoryName="Atta, Rice & Dal" />
        <GroceryItemCard categoryName="Oil, Ghee & Masala" />
        <GroceryItemCard categoryName="Dairy, Bread & Eggs" />
      </View>

      {/* Second Row */}
      <View style={sx.row}></View>
    </View>
  );
}

var sx = StyleSheet.create({
  parent: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 4,
  },
  heading: {
    width: "100%",
    fontSize: 24,
    fontFamily: "NunitoSemiBold",
    paddingVertical: 4,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "lightorange",
  },
});
