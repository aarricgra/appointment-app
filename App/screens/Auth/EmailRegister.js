import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import GlobalApi from "../../services/GlobalApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInputField from "../../components/Auth/TextInputField";
import PasswordInputField from "../../components/Auth/PasswordInputField";
import CssStore from "../../css/AuthCssStore";

export default function EmailRegister({ navigation }) {
  function toLogin() {
    navigation.navigate("EmailLogin");
  }

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [telf, setTelf] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [alreadyInUse, setAlredy] = useState(false);

  function handleRegister() {    //Si todos los campos estan llenos
    if (
      email.trim() != "" &&
      fullName.trim() != "" &&
      password.trim() != "" &&
      password2.trim() != ""
    ) {
      //Si las contraseñas coinciden
      if (confirmed) {
        //Si el correo ya esta en uso
        GlobalApi.getMatchingUser(email).then(async (resp) => {
          if (resp.data.data.length == 0) {
            setAlredy(false);
            const json = {
              data: {
                Nombre: fullName,
                Correo: email,
                Password: password,
                Rango:1
              },
            };
            await GlobalApi.postNewUser(json).then((res) => {
              GlobalApi.checkLoginCredentials(email, password).then(
                async (resp) => {
                  const user = resp.data.data[0];
                  await AsyncStorage.setItem("user", JSON.stringify(user)).then(
                    navigation.navigate("Pro")
                  );
                }
              );
            });
          } else {
            setAlredy(true);
          }
        });
      }
    }
  }

  return (
    <View style={CssStore.EmailRegister_container}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={CssStore.EmailRegister_title}>Regístrate ahora</Text>
        <Text style={CssStore.EmailRegister_subtitle}>
          Por favor, introduce tus datos para completar el proceso de registro
        </Text>
      </View>

      <TextInputField
        icon="person"
        placeholder="Nombre"
        title="Nombre"
        value={fullName}
        onchange={(text) => setFullName(text)}
      />
      <TextInputField
        icon="mail"
        placeholder="Email"
        title="Email"
        value={email}
        onchange={(text) => setEmail(text)}
      />
      {alreadyInUse ? (
        <Text style={CssStore.EmailRegister_waring}>Ya en uso</Text>
      ) : (
        ""
      )}
      <TextInputField
        icon="call"
        placeholder="000 000 000"
        title="Teléfono"
        value={telf}
        onchange={(text) => setTelf(text)}
      />
      <PasswordInputField
        icon="lock-closed"
        placeholder="Contraseña"
        title="Constraseña"
        value={password}
        onchange={(text) => setPassword(text)}
      />
      <PasswordInputField
        icon="lock-closed"
        placeholder="Contraseña"
        title="Confitmar constraseña"
        value={password}
        onchange={(text) => {
          setPassword2(text);
          if (text == password) {
            setConfirmed(true);
          } else {
            setConfirmed(false);
          }
        }}
      />

      <View style={CssStore.TextInputField_slot}>
        <TouchableOpacity
          style={CssStore.EmailRegister_button}
          onPress={handleRegister}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Crear cuenta</Text>
        </TouchableOpacity>
        <View style={CssStore.EmailRegister_toLoginContaier}>
          <Text
            style={{ fontWeight: "bold", color: "white" }}
            onPress={toLogin}
          >
            ¿Ya tienes una cuenta?
          </Text>
          <TouchableOpacity onPress={toLogin}>
            <Text
              style={{
                fontWeight: "bold",
                textDecorationLine: "underline",
                color: "#02e071",
              }}
            >
              Iniciar sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
