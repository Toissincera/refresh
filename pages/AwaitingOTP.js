import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { UserState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControllerFormInput } from "../forms/ControllerForm";

export default function AwaitingOTP() {
  const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiResponse, setAPIResponse] = useState("");

  const otpSchema = Yup.object({
    otp: Yup.number("Must be a number").required("Number is required"),
    //   .min(10, "Must be 10 digits")
    //   .max(10, "Must be 10 digits"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  async function handleOnSubmit(formData) {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.tatd.in/app-api/driver/login/verify-otp-login.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: "9352258931",
            user_type: "Driver",
            otp: formData.otp,
            app_version: "2.37",
            app_type: "android",
          }),
        }
      );
      const json = await response.json();

      if (json.status_code === "200") {
        json.userStatus = "Authorized";
        setAPIResponse(json);
        setUser({ ...user, ...json });
      } else if (json.status_code === "400") {
        setErrorMessage("Too many attempts, try again in 30s");
      } else if (json.status_code === "401") {
        setErrorMessage("401 Network Error, Invalid Request");
      } else {
        setAPIResponse(json);
        setErrorMessage("Network Error. Invalid request.");
      }
    } catch (error) {
      setErrorMessage("Request failed. Please try again later.");
    }
    setLoading(false);
  }

  return (
    <View style={sx.parent}>
      <Text style={sx.header}>Please verify your OTP, Driver</Text>
      <Text style={sx.body}>Phone: {user.driver_mobile_number}</Text>
      <Text style={sx.body}>OTP: {user.otp}</Text>
      <Text style={sx.body}>Status: {user.userStatus}</Text>

      <Text style={sx.body}>
        Please submit the OTP you just received, as shown above
      </Text>

      <ControllerFormInput
        control={control}
        name={"otp"}
        placeholder={"OTP here"}
        required
        errors={errors.otp}
        style={sx.input}
      />
      <Button
        title="Submit"
        onPress={handleSubmit(handleOnSubmit)}
        loading={loading}
      />

      <Text style={sx.small}>{JSON.stringify(apiResponse, null, 4)}</Text>
      <Text style={sx.body}>{errorMessage}</Text>
    </View>
  );
}

var sx = StyleSheet.create({
  parent: { padding: 24, backgroundColor: "ghostwhite" },
  header: {
    marginVertical: 8,
    fontWeight: 600,
    fontSize: 20,
    textAlign: "center",
  },
  body: { marginVertical: 4, fontWeight: 400, textAlign: "center" },
  input: { padding: 8, borderWidth: 2, borderRadius: 4 },
  small: { fontSize: 6, textAlign: "left" },
});
