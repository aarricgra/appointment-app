import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import screenshot from "../../../assets/app_screenshot.png";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LoginHub({ navigation }) {
  function toEmailRegister() {
    navigation.navigate("EmailRegister");
  }

  return (
    <View style={{ alignItems: "center", backgroundColor: "#a6a6a6" }}>
      <Image source={screenshot} style={styles.appImage}></Image>
      <View style={styles.container}>
        <Text style={styles.heading}>Tu Aplicación De</Text>
        <Text style={styles.heading}>Reservas Definitiva</Text>
        <Text style={{ textAlign: "center", paddingTop: 10 }}>
          Reserva citas de manera sencilla a la vez que ganas puntos.
        </Text>
        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={25} color={"white"} />
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Iniciar Con Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mailButton} onPress={toEmailRegister}>
          <Ionicons name="mail" size={25} color={"black"} />
          <Text style={{ fontWeight: "bold" }}>Iniciar Con Correo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appImage: {
    width: 270,
    height: 450,
    marginTop: 60,
    objectFit: "contain",
    borderRadius: 20,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 30,
    marginTop: -20,
    backgroundColor: "#ffffff",
    width: Dimensions.get("screen").width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  mailButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#b0b0b0",
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 30,
    width: Dimensions.get("screen").width * 0.8,
    gap: 7,
  },
  googleButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#1290ff",
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 20,
    width: Dimensions.get("screen").width * 0.8,
    gap: 7,
  },
});
