import { View, Text, Dimensions } from "react-native";
import React, {  useState } from "react";
import CustomCalendar from "../components/MakeApointment/CustomCalendar";

export default function MakeAppointment() {
  const [selectedDay, setSelectedDay] = useState("");
  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
      }}
    >
      <CustomCalendar onDay={(day)=>{setSelectedDay(day)}}/>
      <Text style={{color:"white"}}>{selectedDay}</Text>
      <Text style={{color:"white"}}>{new Date().getFullYear()+"-"+(new Date().getMonth()+1<10?"0"+(new Date().getMonth()+1):new Date().getMonth()+1)+"-"+(new Date().getDate()<10?"0"+(new Date().getDate()):new Date().getDate())}</Text>
    </View>
  );
}
