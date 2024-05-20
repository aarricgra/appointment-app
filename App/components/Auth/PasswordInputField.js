import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import CssStore from "../../css/AuthCssStore";

const PasswordInputField = ({ title, icon, placeholder, onchange, value }) => {
  const [isPass, setIsPass] = useState(true);

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
          secureTextEntry={isPass}
        />
        {isPass ? (
          <Ionicons
            name="eye-off"
            size={30}
            color={"#bfbfbf"}
            style={{ padding: 5 }}
            onPress={()=>setIsPass(!isPass)}
          />
        ) : (
          <Ionicons
            name="eye"
            size={30}
            color={"#bfbfbf"}
            style={{ padding: 5 }}
            onPress={()=>setIsPass(!isPass)}
          />
        )}
      </View>
    </View>
  );
};

export default PasswordInputField;
