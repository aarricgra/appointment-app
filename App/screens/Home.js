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
          img={"/uploads/calendar_badge_43d894d207.png"}
          to={() => navigation.navigate("MakeAppointment")}
        />
        <ButtonNavigator
          text={"Servicos"}
          img={"/uploads/content_cut_b960d268e5.png"}
          to={() => navigation.navigate("Services")}
        />
        <ButtonNavigator
          text={"Productos"}
          img={"/uploads/store_b30d3d8265.png"}
          to={() => navigation.navigate("Products")}
        />
        <ButtonNavigator
          text={"Mis Reservas"}
          img={"/uploads/calendar_clock_outline_d32ed8449b.png"}
          to={() => navigation.navigate("AppointmentInfo", { id: '3' })}
        />
        <ButtonNavigator
          text={"Tarjeta Cliente"}
          img={"/uploads/card_account_details_c17ee4cfc7.png"}
          to={() => navigation.navigate("ClientCard")}
        />
        <ButtonNavigator
          text={"Contacto"}
          img={"/uploads/forum_1ad93702f6.png"}
          to={() => navigation.navigate("Contact")}
        />
      </View>
    </View>
  );
}
