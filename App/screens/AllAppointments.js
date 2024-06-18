import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import GlobalApi from "../services/GlobalApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";

export default function Appointment({ navigation }) {
  const [nextAppointments, setNextAppointments] = useState([]);
  const [lastAppointments, setLastAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(1);

  const getUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  //Guardo las reservas pasadas
  const getUserLastAppointments = async (email) => {
    const resp = await GlobalApi.getUserLastAppointments(email);
    setLastAppointments(resp.data.data);
  };

  //Guardo las reservas futuras
  const getUserNextsAppointments = async (email) => {
    const resp = await GlobalApi.getUserNextsAppointments(email);
    setNextAppointments(resp.data.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (user && user.attributes && user.attributes.Correo) {
        getUserLastAppointments(user.attributes.Correo);
        getUserNextsAppointments(user.attributes.Correo);
      }
    }, [user])
  );

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
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
          gap: Dimensions.get("screen").width * 0.05,
        }}
      >
        <TouchableOpacity
          style={{
            width: Dimensions.get("screen").width * 0.45,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
          onPress={() => setSelected(1)}
        >
          <Text
            style={{
              color: selected === 1 ? "#02e071" : "white",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Proximas Reservas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: Dimensions.get("screen").width * 0.45,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
          onPress={() => setSelected(2)}
        >
          <Text
            style={{
              color: selected === 2 ? "#02e071" : "white",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Historial
          </Text>
        </TouchableOpacity>
      </View>
      {selected == 1 ? (
        <FlatList
          data={nextAppointments}
          horizontal={false}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
              <TouchableOpacity
                style={{
                  borderColor: "grey",
                  borderWidth: 2,
                  borderRadius: 20,
                }}
                onPress={() =>
                  navigation.navigate("AppointmentInfo", { id: item.id })
                }
              >
                <View
                  style={{
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "white" }}>
                    {item.attributes.idServicio.data.attributes.Nombre} Dia:
                    {moment(item.attributes.Fecha).format("DD/MM/YYYY")} Hora:
                    {moment(item.attributes.Hora, "HH:mm:sss").format("HH:mm")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={lastAppointments}
          horizontal={false}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
              <TouchableOpacity
                style={{
                  borderColor: "grey",
                  borderWidth: 2,
                  borderRadius: 20,
                }}
                onPress={() =>
                  navigation.navigate("AppointmentInfo", { id: item.id })
                }
              >
                <View
                  style={{
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "white" }}>
                    {item.attributes.idServicio.data.attributes.Nombre} Dia:
                    {moment(item.attributes.Fecha).format("DD/MM/YYYY")} Hora:
                    {moment(item.attributes.Hora, "HH:mm:sss").format("HH:mm")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
