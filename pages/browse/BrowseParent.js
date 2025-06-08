import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import GroceryItemCard from "./sections/GroceryItemCard";

import { useRecoilState } from "recoil";
import { UserState } from "../../recoil/atom";

export default function BrowseParent() {
  const navigation = useNavigation();
  console.log(UserState);
  return (
    <ScrollView style={sx.parent}>
      <Text style={sx.heading}>Select order</Text>
      <View style={sx.row}>
        <GroceryItemCard
          name1="Fan"
          imgsrc={require("../../assets/products/Fan.jpg")}
          category="fan"
        />
        <GroceryItemCard
          name1="Cookies"
          imgsrc={require("../../assets/products/HonestBakersPremiumCookies.jpg")}
          category="cookies"
        />
        <GroceryItemCard
          name1="Mathri"
          imgsrc={require("../../assets/products/Mathri.jpg")}
          category="mathri"
        />
        <GroceryItemCard
          name1="Paper Cup"
          imgsrc={require("../../assets/products/PaperCup.jpg")}
          category="paperCup"
        />
      </View>
      <Button
        buttonStyle={{ backgroundColor: "green", marginTop: 12, padding: 8 }}
        titleStyle={{
          fontSize: 20,
          fontFamily: "NunitoBold",
        }}
        onPress={() => navigation.navigate("Order")}
      >
        Buy Now
      </Button>
    </ScrollView>
  );
}

var sx = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 12,
  },
  heading: {
    width: "100%",
    fontSize: 28,
    fontFamily: "NunitoExtraBold",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
