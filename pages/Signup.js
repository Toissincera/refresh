import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../supabase/supabase";
import { ControllerFormInput } from "../forms/ControllerForm";
import { useRecoilState } from "recoil";
import { UserState } from "../recoil/atom";
import { Button } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Signup() {
  const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();

  const phoneValidationSchema = Yup.object({
    name: Yup.string("Invalid name").required("Name is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Only 10 digits, no +91 needed"),
    address: Yup.string("Invalid address").required("Address is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(phoneValidationSchema),
  });

  async function createUserSupabase(formdata) {
    setLoading(true);
    const { data, error } = await supabase
      .from("shopkeepers")
      .insert([
        {
          name: formdata.name,
          phoneNumber: formdata.phoneNumber,
          address: formdata.address,
        },
      ])
      .select()
      .single();

    if (error) {
      setLoading(false);
      Alert.alert(
        "Error signing up, try again later",
        JSON.stringify(error, null, 4)
      );
    }
    if (data) {
      setLoading(false);
      Alert.alert("All signed up!", "Welcome to Refresh. Order now!");
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    }
  }

  return (
    <ImageBackground
      source={require("../assets/wallpapers/loginWallpaperLight.jpg")}
      resizeMode="cover"
      style={sx.parent}
      imageStyle={{ top: -240, resizeMode: "contain", position: "absolute" }}
    >
      <View style={sx.impact}>
        <Text style={sx.brand}>REFRESH</Text>
        <Text style={sx.subtitle}>
          Connect with your local grocery suppliers today.
        </Text>
      </View>

      <View style={sx.form}>
        <View style={sx.input}>
          <ControllerFormInput
            control={control}
            name={"name"}
            placeholder={"Name..."}
            required
            errors={errors.name}
          />
        </View>
        <View style={sx.input}>
          <ControllerFormInput
            control={control}
            name={"phoneNumber"}
            placeholder={"Phone number..."}
            required
            errors={errors.phoneNumber}
            keyboardType="numeric"
          />
        </View>
        <View style={sx.input}>
          <ControllerFormInput
            control={control}
            name={"address"}
            placeholder={"Address..."}
            required
            errors={errors.address}
          />
        </View>
        <Button
          buttonStyle={{
            backgroundColor: "green",
            minWidth: "100%",
          }}
          titleStyle={{
            fontSize: 20,
            fontFamily: "NunitoBold",
          }}
          onPress={handleSubmit(createUserSupabase)}
          loading={loading}
          icon={
            <Ionicons
              name="arrow-forward-circle"
              size={36}
              color="black"
            />
          }
          iconRight={true}
        >
          Sign Up &nbsp;
        </Button>
        <Button
          buttonStyle={{
            borderWidth: 4,
            borderColor: "green",
            backgroundColor: "rgba(0,0,0,0)",
            minWidth: "100%",
          }}
          titleStyle={{
            fontSize: 20,
            fontFamily: "NunitoBold",
            color: "#333",
          }}
          onPress={() => nav.navigate("Login")}
        >
          Already a user? Login instead
        </Button>
      </View>
    </ImageBackground>
  );
}

var sx = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  impact: { marginTop: 64 },
  brand: { textAlign: "center", fontSize: 80, fontFamily: "NunitoBold" },
  subtitle: { textAlign: "center", fontSize: 32, fontFamily: "NunitoSemiBold" },
  form: {
    alignItems: "center",
    paddingHorizontal: 36,
    paddingVertical: 8,
    gap: 8,
    width: "100%",
    backgroundColor: "#dedce1",
  },
  input: { width: "100%" },
  button: {
    backgroundColor: "green",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "NunitoBold",
  },
});
