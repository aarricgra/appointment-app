import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import Headers from "../components/Home/Headers";
import SliderPromociones from "../components/Home/SliderPromociones";
import SliderServicios from "../components/Home/SliderServicios";
import AppointmentTop from "../components/Home/AppointmentTop";
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import ButtonNavigator from "../components/Home/ButtonNavigator";

export default function Home({ navigation }) {
  useFocusEffect(() => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
    NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
    setStatusBarHidden(true, "none");
  });

  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
      }}
    >
      <Headers />
      <AppointmentTop />
      <SliderPromociones />
      <SliderServicios />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginVertical: 10,
        }}
      >
        <ButtonNavigator
          text={"Reservar"}
          image="add"
          to={() => navigation.navigate("MakeAppointment")}
        />
        <ButtonNavigator
          text={"Servicos"}
          image="cut"
          to={() => navigation.navigate("Services")}
        />
        <ButtonNavigator
          text={"Productos"}
          image="basket"
          to={() => navigation.navigate("Products")}
        />
        <ButtonNavigator
          text={"Mis Reservas"}
          image="calendar"
          to={() => navigation.navigate("AllApointments")}
        />
        <ButtonNavigator
          text={"Tarjeta Cliente"}
          image="card"
          to={() => navigation.navigate("ClientCard")}
        />
        <ButtonNavigator
          text={"Contacto"}
          image="chatbubbles"
          to={() => navigation.navigate("Contact")}
        />
      </View>
    </View>
  );
}
