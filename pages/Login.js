import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(phoneValidationSchema),
  });

  async function loginUserSupabase(formdata) {
    setLoading(true);
    const { data, error } = await supabase
      .from("shopkeepers")
      .select("*")
      .eq("name", formdata.name)
      .eq("phoneNumber", formdata.phoneNumber)
      .single();
    if (error) {
      setLoading(false);
      Alert.alert(
        "Error logging in, try again later",
        JSON.stringify(error, null, 4)
      );
    }
    if (!data) {
      setLoading(false);
      Alert.alert(
        "Incorrect name or phone number",
        "Make sure the name and number is exact"
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
        <Image
          source={require("../assets/appIcon.png")}
          style={{ width: 160, height: 160, paddingHorizontal: "auto" }}
        />
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
        <Button
          buttonStyle={{
            backgroundColor: "green",
            minWidth: "100%",
          }}
          titleStyle={{
            fontSize: 20,
            fontFamily: "NunitoBold",
          }}
          onPress={handleSubmit(loginUserSupabase)}
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
          Login &nbsp;
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
          onPress={() => nav.navigate("Signup")}
        >
          New here? Sign up instead
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
  impact: { marginTop: 64, alignItems: "center" },
  brand: { textAlign: "center", fontSize: 80, fontFamily: "NunitoBold" },
  subtitle: { 
    textAlign: "center", 
    fontSize: 32, 
    fontFamily: "NunitoBold", 
    marginHorizontal: 16, 
  },
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
