import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import Membership from "./Membership";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import GlobalApi from "../../services/GlobalApi";


export default function ProfileUserinfo({ user }) {
  return (
    <View style={{ height:Dimensions.get("screen").height*0.25}}>
      <View style={styles.mainContainer}>
        <View style={styles.containerImgName}>
          {user.UserImage == undefined ? (
            <Image
              source={{
                uri:
                  GlobalApi.getBaseUrl() +
                  "/uploads/person_e36027a72a.png",
              }}
              style={styles.Img}
            />
          ) : null}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 7,
              flex: 1,
            }}
          >
            <Membership puntos={user.attributes.PuntosGanados} />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              {user.attributes.Nombre}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={38} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.mailContainer}>
        <Ionicons name="mail" size={20} color={"white"} />
        <Text style={{ color: "white", fontSize: 18 }}>
          {user.attributes.Correo}
        </Text>
      </View>
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
  