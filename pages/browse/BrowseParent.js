import { StyleSheet, ScrollView } from "react-native";
import GroceryAndKitchen from "./sections/GroceryAndKitchen";
import SnacksAndDrinks from "./sections/SnacksAndDrinks";

// import { useRecoilState } from "recoil";
// import { UserState } from "../../recoil/atom";

export default function BrowseParent() {
  return (
    <ScrollView style={sx.parent}>
      <GroceryAndKitchen />
      <SnacksAndDrinks />
    </ScrollView>
  );
}

var sx = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
