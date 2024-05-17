import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ContactUs() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
  };

  useEffect(() => {
    getUser();
  }, []);

  if (user == null) return null;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={"mail-outline"} size={100} color={"#02e071"} />
        <Text style={styles.title}>¿Cómo podemos ayudarte?</Text>
        <Text style={styles.description}>
          Por favor, revisa que tus datos personales sean correctos y cuéntanos en
          que podemos ayudar
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person" size={Dimensions.get("screen").width * 0.1} color={"#02e071"} style={styles.icon} />
            <TextInput value={user.attributes.Nombre} style={styles.input} />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={Dimensions.get("screen").width * 0.1} color={"#02e071"} style={styles.icon} />
            <TextInput value={user.attributes.Correo} style={styles.input} />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Comentario</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              multiline
              numberOfLines={6}
              style={styles.textArea}
              placeholder="Introduce aquí tu comentario..."
              placeholderTextColor={"white"}
              textAlignVertical="top"
            />
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text>ContactUs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#171717",
    height: Dimensions.get("screen").height,
    alignItems: "center",
  },
  iconContainer: {
    height: Dimensions.get("screen").height * 0.3,
    display: "flex",
    flexDirection: "column",
    gap: 7,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.7,
  },
  title: {
    color: "#02e071",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  formContainer: {
    height: Dimensions.get("screen").height * 0.7,
    width: Dimensions.get("screen").width,
    paddingHorizontal: Dimensions.get("screen").width * 0.05,
    gap: 10,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },
  label: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  inputContainer: {
    borderColor: "white",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    borderRadius: 15,
    paddingVertical: 5,
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    color: "white",
    fontSize: 20,
    width: Dimensions.get("screen").width * 0.7,
  },
  textAreaContainer: {
    borderColor: "white",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    borderRadius: 15,
    padding: 5,
  },
  textArea: {
    color: "white",
    fontSize: 20,
    width: Dimensions.get("screen").width * 0.85,
  },
  submitButton: {
    borderColor: "#02e071",
    borderWidth: 4,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    width: Dimensions.get("screen").width * 0.9,
    alignSelf: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#02e071",
    fontWeight: "bold",
    fontSize: 20,
  },
});
