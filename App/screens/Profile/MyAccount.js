import { View, Text, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalApi from "../../services/GlobalApi";
import Membership from "../../components/Profile/Membership";
import TextInputField from "../../components/Auth/TextInputField";
import PasswordInputField from "../../components/Auth/PasswordInputField";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
    setMail(JSON.parse(await AsyncStorage.getItem("user")).attributes.Correo);
    setPassword(
      JSON.parse(await AsyncStorage.getItem("user")).attributes.Password
    );
  };

  useEffect(() => {
    getUser();
  }, []);

  if (user == null) {
    return null;
  }

  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
      }}
    >
      <View
        style={{
          display: "flex",
          paddingHorizontal: screenWidth * 0.1,
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          paddingVertical: 20,
          height:screenHeight*0.75
        }}
      >
        {user.UserImage == undefined ? (
          <Image
            source={{
              uri: GlobalApi.getBaseUrl() + "/uploads/person_e36027a72a.png",
            }}
            style={{
              height: 120,
              width: 120,
              borderColor: "white",
              borderWidth: 3,
              borderRadius: 99,
            }}
          />
        ) : null}
        <Membership puntos={user.attributes.PuntosGanados}></Membership>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
          {user.attributes.Nombre}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: screenWidth * 0.9,
          }}
        >
          <TextInputField
            title={"Email"}
            placeholder={"Email"}
            icon={"mail"}
            value={mail}
            onchange={(text) => setMail(text)}
          />
          <PasswordInputField
            icon={"key"}
            onchange={(text) => setPassword(text)}
            title={"Contraseña"}
            placeholder={"Contraseña"}
            value={password}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          borderColor: "#02e071",
          borderWidth: 4,
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: 10,
          width: Dimensions.get("screen").width * 0.8,
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "#02e071",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Atras
        </Text>
      </TouchableOpacity>
    </View>
  );
}
