import React, { useState } from "react";
import { View, Text } from "react-native";
import { CurrentOrderState } from "../../recoil/atom";
import { useRecoilState } from "recoil";

export default function OrderParent() {
  const [order, setOrder] = useRecoilState(CurrentOrderState);
  return (
    <View>
      <Text>I am Order Parent</Text>
    </View>
  );
}
