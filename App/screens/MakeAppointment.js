import { View, Text, Dimensions } from "react-native";
import React, {  useEffect, useState } from "react";
import CustomCalendar from "../components/MakeApointment/CustomCalendar";
import moment from "moment";
import TimePicker from "../components/MakeApointment/TimePicker";

export default function MakeAppointment() {
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  const [selectedHour, setSelectedHour] = useState("")
  
  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
      }}
    >
      <CustomCalendar onDay={(day)=>setSelectedDay(day)}/>
      <Text style={{color:"white"}}>{moment(selectedDay).format("DD-MM-YYYY")}</Text>
      <Text style={{color:"white"}}>{selectedHour}</Text>
      <TimePicker day={selectedDay} hour={selectedHour} onchange={(newHour)=>setSelectedHour(newHour)}/>
    </View>
  );
}
