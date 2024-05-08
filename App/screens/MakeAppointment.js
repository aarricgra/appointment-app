import { View, Text, Dimensions } from "react-native";
import React, {  useEffect, useState } from "react";
import CustomCalendar from "../components/MakeApointment/CustomCalendar";
import moment from "moment";

export default function MakeAppointment() {
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  
  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
      }}
    >
      <CustomCalendar onDay={(day)=>setSelectedDay(day)}/>
      <Text style={{color:"white"}}>{moment(selectedDay).format("DD-MM-YYYY")}</Text>
      <Text style={{color:"white"}}>{moment().format("DD-MM-YYYY")}</Text>
    </View>
  );
}
