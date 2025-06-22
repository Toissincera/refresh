import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
} from "react-native";
import { supabase } from "../../supabase/supabase";
import CircularLoading from "../../componentsNative/animated/CircularLoading";

export default function AllOrders() {
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchAllOrders = async () => {
      try {
        let { data, error } = await supabase
          .from("purchaseRequests")
          .select("*")
          .limit(25);
        if (error) {
          Alert.alert("Error fetching orders", JSON.stringify(error, null, 4));
        }
        if (!data[0]) {
          Alert.alert("No orders yet", "There are no orders placed yet");
        }
        if (data) {
          setAllOrders(data);
        }
      } catch (e) {
        Alert.alert("Error finding orders", e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  if (loading) return <CircularLoading />;

  return (
    <View style={sx.parent}>
      <Text style={sx.heading}>View All Orders</Text>
      <View style={sx.row}>
        <FlatList
          data={allOrders}
          keyExtractor={(item) => item.id}
          persistentScrollbar
          renderItem={({ item }) => (
            <OrderCard
              fromName={item.fromName}
              fromNumber={item.fromNumber}
              order={item.order}
            />
          )}
        />
      </View>
    </View>
  );
}

function OrderCard({ fromName, fromNumber, order }) {
  return (
    <View style={sx.card}>
      <View style={sx.userContainer}>
        <Text style={sx.fromName}>{fromName || "No Sender"}</Text>
        <Text style={sx.fromNumber}>{fromNumber}</Text>
      </View>
      <View style={sx.orderContainer}>
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
      </View>
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
    width: "100%",
    color: "#0f172b",
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  fromName: {
    fontFamily: "NunitoBold",
    fontSize: 22,
  },
  fromNumber: {
    fontFamily: "NunitoSemiBold",
    fontSize: 20,
  },
  orderContainer: {
    width: "100%",
    // flexDirection: "row",
    // flexWrap: "wrap",
    gap: 6,
  },
  orderItem: {
    fontFamily: "NunitoSemiBold",
    fontSize: 16,
  },
});
