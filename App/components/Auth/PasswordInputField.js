import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import CssStore from "../../css/AuthCssStore";

const PasswordInputField = ({ title, icon, placeholder, onchange, value }) => {
  return (
    <View style={CssStore.TextInputField_slot}>
      <Text style={{ color: "white", marginBottom: 7 }}>{title}</Text>
      <View style={CssStore.TextInputField_inputContainer}>
        <Ionicons
          name={icon}
          size={30}
          color={"#02e071"}
          style={{ padding: 5 }}
        />
        <TextInput
          style={CssStore.TextInputField_input}
          placeholder={placeholder}
          onChangeText={onchange}
          value={value}
          placeholderTextColor={"white"}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
    </View>
  );
};

export default PasswordInputField;
