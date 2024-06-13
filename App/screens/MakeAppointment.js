import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomCalendar from "../components/MakeApointment/CustomCalendar";
import moment from "moment";
import TimePicker from "../components/MakeApointment/TimePicker";
import ServicePicker from "../components/MakeApointment/ServicePicker";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as NavigationBar from "expo-navigation-bar";
import { useFocusEffect } from "@react-navigation/native";
import { setStatusBarHidden } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalApi from "../services/GlobalApi";



export default function MakeAppointment({navigation}) {
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [user,setUser]=useState(null)

  const getUser = async ()=>{
    setUser(JSON.parse(await AsyncStorage.getItem("user")))
  }

  useEffect(()=>{
    getUser()
  },[])

  useFocusEffect(() => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
    NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
    setStatusBarHidden(true, "none");
  });

  function handlePost(){
    if(selectedHour.trim() != "" &&selectedDay.trim() != ""){
      const data = {
        data: {
          Fecha: selectedDay,
          Hora: selectedHour+":00.00",
          idServicio: selectedService,
          idCliente:user.id
        },
      };
      console.log(data);
      GlobalApi.postNewAppointment(data).then((res)=>navigation.navigate("AppointmentInfo", { id: res.data.data.id }))
    }
  }

  return (
    <ScrollView
      style={{
        backgroundColor: "#171717",
      }}
    >
      <CustomCalendar onDay={(day) => setSelectedDay(day)} />
      <ServicePicker
        service={selectedService}
        onchange={(newService) => setSelectedService(newService)}
      />
      <TimePicker
        key={selectedDay}
        day={selectedDay}
        hour={selectedHour}
        onchange={(newHour) => {setSelectedHour(newHour)}}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom:20
        }}
      >
        <TouchableOpacity
          style={{
            display:"flex",
            flexDirection:"row",
            backgroundColor: "white",
            paddingVertical: 10,
            paddingHorizontal: 50,
            borderRadius: 20,
            width: Dimensions.get("screen").width * 0.9,
            alignItems: "center",
            justifyContent:"center",
            gap:10
          }}
          onPress={()=>handlePost()}
        >
          <Text style={{fontSize:18,fontWeight:"bold"}}>Reservar</Text><Ionicons name="calendar-outline" size={40} color={"#000000"}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
