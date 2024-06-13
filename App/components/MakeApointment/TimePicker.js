import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";
import moment from "moment";
import { SelectList } from "react-native-dropdown-select-list";

export default function TimePicker({ day, onchange,hour }) {
  const [appointments, setAppointmets] = useState([]);
  const hours = [];
  const start = moment("08:00", "HH:mm");
  const end = moment("23:00", "HH:mm");
  const interval = 25;
  this.timeArray = [];

  while (start <= end) {
    hours.push(start.format("HH:mm"));
    start.add(interval, "minutes");
  }

  

  useEffect(() => {
    getDayAppointments();
  }, [day]);

  const getDayAppointments = () =>
    GlobalApi.getDayAppointmets(day).then((resp) => {
      setAppointmets(resp.data.data);
    });

    if(appointments.length>0){
        appointments.forEach((item)=>{
            const hora = moment(item.attributes.Hora,"HH:mm:sss").format("HH:mm")
            hours.splice(hours.findIndex((element) => element == hora),1)
        })
    }

    onchange(hours[0])


  return (
    <View style={{ paddingHorizontal: separator, paddingBottom:20}}>
      <Text style={styles.title}>Horas disponibles</Text>
        <SelectList
        data={hours}
        placeholder="Elige una hora"
        dropdownTextStyles={{color:"white"}}
        inputStyles={{color:"white"}}
        boxStyles={{color:"wihte"}}
        dropdownStyles={{color:"wihte"}}
        setSelected={onchange}
        search={false}
        >

        </SelectList>
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
