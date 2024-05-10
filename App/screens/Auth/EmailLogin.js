import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalApi from "../../services/GlobalApi";
import TextInputField from "../../components/Auth/TextInputField";
import PasswordInputField from "../../components/Auth/PasswordInputField";
import AuthCssStore from "../../css/AuthCssStore"
import { TouchableOpacity } from "react-native-gesture-handler";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function handleLogin() {
    GlobalApi.checkLoginCredentials(email, password).then(async (resp) => {
      const user =(resp.data.data[0]);
      await AsyncStorage.setItem("user",JSON.stringify(user)).then(navigation.navigate("Pro"))
    });
  }

  return (
    <View style={AuthCssStore.EmailRegister_container}>
      <View style={AuthCssStore.TextInputField_slot}>
        <Text style={AuthCssStore.EmailRegister_title} >Hola de nuevo</Text>
        <Text style={AuthCssStore.EmailRegister_subtitle}>
           Introduce tus datos para iniciar sesión en tu cuenta. ¡Nos vemos dentro!
        </Text>
      </View>
      <TextInputField icon="mail" onchange={(text) => setEmail(text)} placeholder={"Email"} title={"Email"} value={email}/>
      <PasswordInputField icon={"lock-closed"} onchange={(text) => setPassword(text)} placeholder={"Password"} title={"Contraseña"} value={password}/>
      <View style={AuthCssStore.TextInputField_slot}>
        <TouchableOpacity
          style={AuthCssStore.EmailRegister_button}
          onPress={handleLogin}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Iniciar sesión</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#171717"
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color:"white"
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
