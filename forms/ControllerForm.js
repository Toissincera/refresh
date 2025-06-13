import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function ControllerFormInput({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  required,
  errors = "Field required",
  keyboardType = "default",
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        maxLength: 100,
        required: required,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={sx.parent}>
          <View style={sx.inputParent}>
            <TextInput
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
              style={[
                sx.textInput,
                errors.message ? sx.borderWarning : sx.borderNormal,
              ]}
              keyboardType={keyboardType}
            />
          </View>
          {errors.message && <Text style={sx.warning}>{errors.message}</Text>}
        </View>
      )}
    />
  );
}

const sx = StyleSheet.create({
  parent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  inputParent: {
    display: "flex",
    width: "100%",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
  },
  textInput: {
    width: "100%",
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderRadius: 4,
    fontSize: 18,
    fontWeight: 400,
    color: "black",
  },
  warning: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: "left",
  },
  borderNormal: {
    borderColor: "black",
  },
  borderWarning: {
    borderColor: "tomato",
  },
});
