import { View, Text, Dimensions } from "react-native";
import React, {  useState } from "react";
import CustomCalendar from "../components/MakeApointment/CustomCalendar";
import MyFunctions from "../services/MyFunctions"

export default function MakeAppointment() {
  const [selectedDay, setSelectedDay] = useState(MyFunctions.getCurrentDate());
  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
      }}
    >
      <CustomCalendar onDay={(day)=>{setSelectedDay(day)}}/>
      <Text style={{color:"white"}}>{selectedDay!=null&&new Date(selectedDay).toLocaleDateString()}</Text>
      <Text style={{color:"white"}}>{MyFunctions.getCurrentDate().toLocaleDateString()}</Text>
    </View>
  );
}
