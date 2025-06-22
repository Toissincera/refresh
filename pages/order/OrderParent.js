import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { CurrentOrderState, UserState } from "../../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { supabase } from "../../supabase/supabase";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";

export default function OrderParent() {
  const user = useRecoilValue(UserState);
  const [recentOrders, setRecentOrder] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // work done on focus
      let isActive = true;
      async function fetchRecentOrders() {
        const { data, error } = await supabase
          .from("purchaseRequests")
          .select("*")
          .eq("fromNumber", user.phoneNumber)
          .order("id", { ascending: false });

        if (error) {
          Alert.alert("Oops!", "No recent orders found.", [{ text: "Okay" }]);
        }
        if (data) {
          setRecentOrder(data);
        }
      }
      fetchRecentOrders();
      return () => {
        // work done on blur
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={sx.parent}>
      <Text style={sx.heading}>View Recent Orders</Text>
      <View style={sx.row}>
        <FlatList
          data={recentOrders}
          keyExtractor={(item) => item.id}
          persistentScrollbar
          renderItem={({ item }) => (
            <RecentOrderCard
              order={item.order}
              createdAt={item.createdAt}
            />
          )}
          ListEmptyComponent={
            <Text style={sx.orderItem}>
              No Recent Orders found. You can order anytime.
            </Text>
          }
        />
      </View>
    </View>
  );
}

function RecentOrderCard({ order, createdAt }) {
  return (
    <View style={sx.card}>
      {Object.entries(order).map(([key, value]) =>
        value > 0 ? (
          <Text
            key={key}
            style={sx.orderItem}
          >
            {`${key.toUpperCase()}: ${value}\n`}
          </Text>
        ) : null
      )}
      <Text style={sx.orderDate}>{new Date(createdAt).toLocaleString()}</Text>
    </View>
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
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 8,
    color: "#0f172b",
    width: "100%",
  },
  orderItem: {
    fontFamily: "NunitoBold",
    fontSize: 20,
  },
  orderDate: {
    fontFamily: "Nunito",
    fontSize: 16,
  },
});
