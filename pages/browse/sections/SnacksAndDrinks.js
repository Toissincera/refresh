import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GroceryItemCard from "./GroceryItemCard";

export default function SnacksAndDrinks() {
  return (
    <View style={sx.parent}>
      <Text style={sx.heading}>Snacks & Drinks</Text>
      {/* First Row */}
      <View style={sx.row}>
        <GroceryItemCard
          name1="Chips &"
          name2="Namkeen"
          imgsrc={require("../../../assets/icons/potato-chips.png")}
        />
        <GroceryItemCard
          name1="Chocolate"
          name2="& Sweets"
          imgsrc={require("../../../assets/icons/allChocolate.png")}
        />
        <GroceryItemCard
          name1="Drinks &"
          name2="Juices"
          imgsrc={require("../../../assets/icons/allDrinksSweet.png")}
        />
        <GroceryItemCard
          name1="Tea, Coffee"
          name2="& Milk Drinks"
          imgsrc={require("../../../assets/icons/allDrinksCaffeine.png")}
        />
      </View>

      {/* Second Row */}
      <View style={sx.row}>
        <GroceryItemCard
          name1="Instant"
          name2="Food"
          imgsrc={require("../../../assets/icons/noodle.png")}
        />
        <GroceryItemCard
          name1="Sauces &"
          name2="Spreads"
          imgsrc={require("../../../assets/icons/ketchup.png")}
        />
        <GroceryItemCard
          name1="Paan &"
          name2="Tobacco"
          imgsrc={require("../../../assets/icons/smoking-pipe.png")}
        />
        <GroceryItemCard
          name1="Ice Cream"
          name2="& More"
          imgsrc={require("../../../assets/icons/ice-cream.png")}
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
