import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AboutUs({navigation}) {
  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
      }}
    >
      <View
        style={{
          height: Dimensions.get("screen").height * 0.4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white" }}>Aqui va una imagen</Text>
      </View>
      <View
        style={{
          backgroundColor: "#474747",
          height: Dimensions.get("screen").height * 0.6,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 15,
            padding: 30,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Sobre CSBarber
          </Text>
          <Text style={{ color: "white", fontSize: 18 }}>
            "CSBarber: The Best Solution for Online Barber Bookings" Want a more
            practical and efficient hair shaving experience? CSBarber is the
            best solution for you! CSBarber is an online barber booking
            application that makes it easy for you to search, select and order
            haircut services easily and quickly.
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
              borderBottomWidth: 1,
              borderColor: "#858585",
              paddingVertical: 5,
            }}
            onPress={() => onClick()}
          >
            <Text
              style={{ color: "#02e071", fontSize: 20, fontWeight: "bold" }}
            >
              Puntúa y deja tu reseña
            </Text>
            <Ionicons
              name={"arrow-forward-outline"}
              size={38}
              color={"#02e071"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{
    borderColor: "#02e071",
    borderWidth: 4,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    width: Dimensions.get("screen").width * 0.8,
    alignSelf: "center",
    marginTop: 10,
  }} onPress={()=>navigation.goBack()}>
          <Text style={{
    color: "#02e071",
    fontWeight: "bold",
    fontSize: 20,
  }}>Atras</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
