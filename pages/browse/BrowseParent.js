import { StyleSheet, ScrollView, View, Text, Alert } from "react-native";
import { Button } from "@rneui/base";
import GroceryItemCard from "./sections/GroceryItemCard";
import { useRecoilState } from "recoil";
import { CurrentOrderState, UserState } from "../../recoil/atom";

import { supabase } from "../../supabase/supabase";
import { useState } from "react";

export default function BrowseParent() {
  const [user, setUser] = useRecoilState(UserState);
  const [order, setOrder] = useRecoilState(CurrentOrderState);
  const [loading, setLoading] = useState(false);

  async function sendPurchaseToSupabase() {
    setLoading(true);
    const { data, error } = await supabase
      .from("purchaseRequests")
      .insert([
        {
          fromShopkeeper: user[0].phoneNumber,
          order: order,
        },
      ])
      .select();

    if (error) {
      setLoading(false);
      Alert.alert("Error placing order", error);
    }
    if (data) {
      setLoading(false);
      Alert.alert(
        "Order Sent!",
        "Delivery will be made soon. Check order summary in the Order tab.",
        [{ text: "Okay" }]
      );
      setOrder({ fan: 0, cookies: 0, mathri: 0, paperCup: 0 });
    }
    setLoading(false);
  }
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
        onPress={() => sendPurchaseToSupabase()}
        loading={loading}
        disabled={
          !order.fan && !order.cookies && !order.mathri && !order.paperCup
        }
      >
        Buy Now!!!
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
