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

export default function AllShopkeepers() {
  const [loading, setLoading] = useState(false);
  const [allShopkeepers, setAllShopkeepers] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchAllShopkeepers = async () => {
      try {
        let { data, error } = await supabase
          .from("shopkeepers")
          .select("*")
          .limit(50);
        if (error) {
          Alert.alert(
            "Error fetching shopkeeper info",
            JSON.stringify(error, null, 4)
          );
        }
        if (!data[0]) {
          Alert.alert("No shopkeepers found", "Where did they all go?");
        }
        if (data) {
          setAllShopkeepers(data);
        }
      } catch (e) {
        Alert.alert("Error finding shopkeeper info", e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllShopkeepers();
  }, []);

  if (loading) return <CircularLoading />;

  return (
    <View style={sx.parent}>
      <Text style={sx.heading}>View All Shopkeepers</Text>
      <View style={sx.row}>
        <FlatList
          data={allShopkeepers}
          keyExtractor={(item) => item.id}
          persistentScrollbar
          renderItem={({ item }) => (
            <ShopkeeperCard
              name={item.name}
              phoneNumber={item.phoneNumber}
              address={item.address}
            />
          )}
        />
      </View>
    </View>
  );
}

function ShopkeeperCard({ name, phoneNumber, address }) {
  return (
    <View style={sx.card}>
      <Text style={sx.name}>{name || "No Name"}</Text>
      <Text style={sx.phoneNumber}>{phoneNumber || "No phone number"}</Text>
      <Text style={sx.address}>{address || "No address"}</Text>
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
  name: {
    fontFamily: "NunitoBold",
    fontSize: 24,
  },
  phoneNumber: {
    fontFamily: "NunitoSemiBold",
    fontSize: 20,
  },
  address: {
    fontFamily: "NunitoSemiBold",
    fontSize: 16,
  },
});
