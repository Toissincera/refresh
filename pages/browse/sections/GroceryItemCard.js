import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRecoilState } from "recoil";
import { CurrentOrderState } from "../../../recoil/atom";

export default function GroceryItemCard({ name1, imgsrc, category }) {
  const [order, setOrder] = useRecoilState(CurrentOrderState);

  const increment = () => {
    setOrder((prev) => ({
      ...prev,
      [category]: prev[category] + 1,
    }));
  };

  const decrement = () => {
    setOrder((prev) => ({
      ...prev,
      [category]: Math.max(0, prev[category] - 1),
    }));
  };
  return (
    <ScrollView
      style={sx.parent}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <ImageBackground
        source={imgsrc}
        resizeMode="cover"
        style={sx.image}
      />
      <Text style={sx.tag}>{name1 || "??"}</Text>
      <View style={sx.buttonGroup}>
        <AntDesign
          name="minussquare"
          size={30}
          color="tomato"
          onPress={decrement}
        />
        <Text style={sx.counter}>{order[category]}</Text>
        <AntDesign
          name="plussquare"
          size={30}
          color="green"
          onPress={increment}
        />
      </View>
    </ScrollView>
  );
}

var sx = StyleSheet.create({
  parent: {
    width: "50%",
    padding: 6,
    marginBottom: 12,
  },
  imgParent: {
    backgroundColor: "rgb(155, 188, 242)",
    borderRadius: 6,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  tag: { fontFamily: "NunitoBold", fontSize: 20 },
  counter: { fontFamily: "NunitoSemiBold", fontSize: 24 },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
