import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";
import moment from "moment";
import { SelectList } from "react-native-dropdown-select-list";

export default function TimePicker({ day, onchange, hour }) {
  const [appointments, setAppointments] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  

  useEffect(() => {
    const fetchDayAppointments = async () => {
      const response = await GlobalApi.getDayAppointmets(day);
      setAppointments(response.data.data);
    };

    fetchDayAppointments();
  }, [day]);

  useEffect(() => {
    const interval = 25;
    const hours = [];
    const start = moment("08:00", "HH:mm");
    const end = moment("23:00", "HH:mm");

    //Rellenar array con todas las horas
    while (start <= end) {
      hours.push(start.format("HH:mm"));
      start.add(interval, "minutes");
    }

    if (appointments.length > 0) {
      appointments.forEach((item) => {
        //Darle formato a la hora de la reserva
        const appointmentTime = moment(
          item.attributes.Hora, "HH:mm:sss"
        ).format("HH:mm");
        //Borrar esa misma hora del array
        const index = hours.indexOf(appointmentTime);
        if (index !== -1) {
          hours.splice(index, 1);
        }
      });
    }

    setAvailableHours(hours);

    if (hours.length > 0) {
      onchange(hours[0]);
    }
  }, [appointments]);

  return (
    <View style={{ paddingHorizontal: separator, paddingBottom: 20 }}>
      <Text style={styles.title}>Horas disponibles</Text>
      <SelectList
        data={availableHours}
        placeholder="Elige una hora"
        dropdownTextStyles={{ color: "white" }}
        inputStyles={{ color: "white" }}
        boxStyles={{ color: "white" }}
        dropdownStyles={{ color: "white" }}
        setSelected={(value)=>onchange(value)}
        search={false}
      />
    </View>
  );
}

const screenWidth = Dimensions.get("screen").width;
const separator = parseInt(screenWidth * 0.04);
const styles = StyleSheet.create({
  textTaken: { color: "white", fontSize: 20 },
  buttonTaken: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: screenWidth * 0.2,
    alignItems: "center",
  },
  textSelected: { color: "#02e071", fontSize: 20 },
  buttonSelected: {
    borderColor: "#02e071",
    borderWidth: 2,
    borderRadius: 10,
    width: screenWidth * 0.2,
    alignItems: "center",
  },
  textNotTaken: { color: "#34d2eb", fontSize: 20 },
  buttonNotTaken: {
    borderColor: "#34d2eb",
    borderWidth: 2,
    borderRadius: 10,
    width: screenWidth * 0.2,
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: separator,
    flexWrap: "wrap",
  },
  title: { color: "white", marginBottom: 10, fontWeight: "bold", fontSize: 18 },
});
