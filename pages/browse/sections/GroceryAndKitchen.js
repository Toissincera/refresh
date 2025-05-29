import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GroceryItemCard from "./GroceryItemCard";

export default function GroceryAndKitchen() {
  return (
    <View style={sx.parent}>
      <Text style={sx.heading}>Grocery & Kitchen</Text>
      {/* First Row */}
      <View style={sx.row}>
        <GroceryItemCard
          name1="Vegetables"
          name2="& Fruits"
          imgsrc={require("../../../assets/icons/allVegFruits.png")}
        />
        <GroceryItemCard
          name1="Atta, Rice"
          name2="& Dal"
          imgsrc={require("../../../assets/icons/allCereal.png")}
        />
        <GroceryItemCard
          name1="Oil, Ghee"
          name2="& Masala"
          imgsrc={require("../../../assets/icons/allKitchentials.png")}
        />
        <GroceryItemCard
          name1="Dairy, Eggs"
          name2="& Bread"
          imgsrc={require("../../../assets/icons/allDairy.png")}
        />
      </View>

      {/* Second Row */}
      <View style={sx.row}>
        <GroceryItemCard
          name1="Bakery &"
          name2="Biscuits"
          imgsrc={require("../../../assets/icons/allBakery.png")}
        />
        <GroceryItemCard
          name1="Dry Fruits"
          name2="& Cereals"
          imgsrc={require("../../../assets/icons/dried-fruits.png")}
        />
        <GroceryItemCard
          name1="Meat &"
          name2="Fish"
          imgsrc={require("../../../assets/icons/allPantryMeat.png")}
        />
        <GroceryItemCard
          name1="Kitchen"
          name2="Appliances"
          imgsrc={require("../../../assets/icons/allKitchenAppliance.png")}
        />
      </View>
    </View>
  );
}

var sx = StyleSheet.create({
  parent: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  heading: {
    width: "100%",
    fontSize: 28,
    fontFamily: "NunitoExtraBold",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
