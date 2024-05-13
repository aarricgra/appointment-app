import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Membership from "../components/Profile/Membership";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
  };

  useEffect(() => {
    getUser();
  }, []);

  function signOut() {
    AsyncStorage.removeItem("user").then(navigation.navigate("Pro"));
  }

  if (user == null) return null;

  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
      }}
    >
      <View style={styles.mainContainer}>
        <View style={styles.containerImgName}>
          {user.UserImage == undefined ? (
            <Image
              source={{
                uri:
                  process.env.EXPO_PUBLIC_API_URL +
                  "/uploads/person_e36027a72a.png",
              }}
              style={styles.Img}
            />
          ) : null}
          <View style={{ display: "flex", flexDirection: "column", gap: 7 ,flex:1}}>
            <Membership puntos={user.attributes.PuntosGanados} />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              {user.attributes.Nombre}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{flex:1}}>
          <Ionicons name="create-outline" size={38} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.mailContainer}>
        <Ionicons name="mail" size={20} color={"white"} />
        <Text style={{ color: "white", fontSize: 18 }}>
          {user.attributes.Correo}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#1290ff",
          borderRadius: 90,
          alignItems: "center",
          padding: "auto",
          marginTop: 140,
          width: Dimensions.get("screen").width * 0.8,
        }}
        onPress={signOut}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    gap: 10,
  },
  containerImgName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex:5
  },
  Img: {
    height: 70,
    width: 70,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 99,
  },
  mailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 20,
  },
});
