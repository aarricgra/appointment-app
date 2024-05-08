import { View, Text, Dimensions } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Pro from "../screens/Pro";
import Home from "../screens/Home";
import LoginHub from "../screens/Auth/LoginHub";
import EmailLogin from "../screens/Auth/EmailLogin";
import EmailRegister from "../screens/Auth/EmailRegister";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Appointments from "../screens/Appointments";
import Profile from "../screens/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MakeAppointment from "../screens/MakeAppointment"
import ButtonNavigator from "../components/Home/ButtonNavigator";

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
        name="Appointments"
        component={Appointments}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          title: "Reservas",
        }}
      />
      <Tab.Screen
        name="Store"
        component={Profile}
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
            title: "",
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
    </Stack.Navigator>
  );
}
