import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { CurrentOrderState, UserState } from "../../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { supabase } from "../../supabase/supabase";

export default function OrderParent() {
  const user = useRecoilValue(UserState);
  const [recentOrders, setRecentOrder] = useState([]);
  useEffect(() => {
    async function fetchRecentOrders() {
      const { data, error } = await supabase
        .from("purchaseRequests")
        .select("*")
        .eq("fromShopkeeper", user[0].phoneNumber);

      if (error) {
        Alert.alert("Oops!", "No recent orders found.", [{ text: "Okay" }]);
      }
      if (data) {
        Alert.alert("Recent orders", "Here are your recent orders", [
          { text: "Okay" },
        ]);
        setRecentOrder(data);
      }
    }
    fetchRecentOrders();
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(recentOrders, null, 4)}</Text>
    </View>
  );
}
