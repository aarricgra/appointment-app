import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import "moment/locale/es";
import { useFocusEffect } from "@react-navigation/native";

export default function AppointmentTop() {
  const [hasAppointment, setHasAppointment] = useState(false);
  const [user, setUser] = useState(null);
  const [date, setDia] = useState("");
  const [time, setHora] = useState("");

  //Coger usuario de cache
  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
  };

  //Coger reservas del usuario con fecha superior a hoy
  if (user != null) {
    GlobalApi.getUserNextsAppointments(user.attributes.Correo).then((res) => {
      if (res.data.data[0]) {
        const info = res.data.data[0].attributes;
        setHora(moment(info.Hora, "HH:mm:sss").format("HH:mm"));
        setDia(moment(info.Fecha).format("DD [de] MMMM"));
        setHasAppointment(true);
      }
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, [])
  );

  useEffect(() => {
    if (user != null) {
      GlobalApi.getUserNextsAppointments(user.attributes.Correo).then((res) => {
        if (res.data.data[0]) {
          const info = res.data.data[0].attributes;
          setHora(moment(info.Hora, "HH:mm:sss").format("HH:mm"));
          setDia(moment(info.Fecha).format("DD [de] MMMM"));
          setHasAppointment(true);
        } else {
          setHasAppointment(false);
        }
      });
    }
  }, [user]);

  
  return (
    <View style={styles.contaier}>
      {hasAppointment ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 7,
          }}
        >
          <Ionicons name="calendar" size={32} color={"white"} />
          <Text style={styles.text}>
            Tienes una cita el {date} a las {time}
          </Text>
        </View>
      ) : (
        <Text style={styles.text}>Aun no tienes ninguna cita</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contaier: {
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 5,
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    marginHorizontal: Dimensions.get("screen").width * 0.025,
    width: Dimensions.get("screen").width * 0.95,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
});
