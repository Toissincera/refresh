import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import { ControllerFormInput } from "../forms/ControllerForm";
import { useRecoilState } from "recoil";
import { UserState } from "../recoil/atom";

export default function Login() {
  const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiResponse, setAPIResponse] = useState(null);

  const phoneValidationSchema = Yup.object({
    phoneNumber: Yup.number("Must be a number").required("Number is required"),
    //   .min(10, "Must be 10 digits")
    //   .max(10, "Must be 10 digits"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(phoneValidationSchema),
  });

  async function handleOnSubmit(formData) {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.tatd.in/app-api/driver/login/driver-login.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: "9352258931",
            user_type: "Driver",
            app_version: "2.37",
            app_type: "android",
          }),
        }
      );
      const json = await response.json();

      if (json.status_code === "200") {
        json.userStatus = "AwaitingOTP";
        setUser(json);
      } else {
        setErrorMessage("Network Error. Invalid request.");
      }
    } catch (error) {
      setErrorMessage("Request failed. Please try again later.");
    }
    setLoading(false);
  }

  return (
    <ImageBackground
      source={require("../assets/wallpapers/loginWallpaperLight.jpg")}
      resizeMode="cover"
      style={sx.parent}
    >
      <View style={sx.impact}>
        <Text style={sx.title}>Welcome to</Text>
        <Text style={sx.brand}>REFRESH</Text>
        <Text style={sx.subtitle}>Connect with your local suppliers now!</Text>
      </View>
      <View style={sx.form}>
        <Text style={sx.header}>Please enter your phone number to verify</Text>
        <ControllerFormInput
          control={control}
          name={"phoneNumber"}
          placeholder={"9876543210"}
          required
          errors={errors.phoneNumber}
          style={sx.input}
        />
        <Button
          title="Submit"
          onPress={handleSubmit(handleOnSubmit)}
          loading={loading}
        />
        <Text>{apiResponse}</Text>
        <Text>{errorMessage}</Text>
      </View>
    </ImageBackground>
  );
}

var sx = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  impact: { borderWidth: 1, marginTop: 64 },
  title: { textAlign: "center", fontSize: 48, fontFamily: "Nunito-Black" },
  brand: { textAlign: "center", fontSize: 64 },
  subtitle: { textAlign: "center", fontSize: 32 },
  form: { padding: 8, borderWidth: 2, borderRadius: 4 },
});
