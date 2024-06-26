import { View, Text, Dimensions } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Pro from "../screens/Pro";
import Home from "../screens/Home";
import LoginHub from "../screens/Auth/LoginHub";
import EmailLogin from "../screens/Auth/EmailLogin";
import EmailRegister from "../screens/Auth/EmailRegister";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllAppointments from "../screens/AllAppointments";
import AppointmentInfo from "../screens/AppointmentInfo";
import Profile from "../screens/Profile/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MakeAppointment from "../screens/MakeAppointment";
import ButtonNavigator from "../components/Home/ButtonNavigator";
import AboutUs from "../screens/Profile/AboutUs";
import ContactUs from "../screens/Profile/ContactUs";
import MyAccount from "../screens/Profile/MyAccount";
import Store from "../screens/Store";
import Services from "../screens/Services";
import ClientCard from "../screens/ClientCard";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 10,
          height: 60,
          backgroundColor: "#363636",
        },
        tabBarActiveTintColor: "#02e071",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          title: "Inicio",
        }}
      />
      <Tab.Screen
        name="AllApointments"
        component={AllAppointments}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          title: "Reservas",
        }}
      />
      <Tab.Screen
        name="Store"
        component={Store}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="basket" size={size} color={color} />
          ),
          title: "Tienda",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
          title: "Perfil",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />
    </Tab.Navigator>
  );
}

export default function Screens() {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LoginHub"
        component={LoginHub}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailLogin"
        component={EmailLogin}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EmailRegister"
        component={EmailRegister}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="MakeAppointment"
        component={MakeAppointment}
        options={{
          title: "Reservar cita",
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="AppointmentInfo"
        component={AppointmentInfo}
        options={{
          title: "Información cita",
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ButtonNavigator"
        component={ButtonNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: "Sobre CSBarber",
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          title: "Ponte en contacto",
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: "Mi cuenta",
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Services"
        component={Services}
        options={{
          title: "Servicios",
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ClientCard"
        component={ClientCard}
        options={{
          title: "Tarjeta Cliente",
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
