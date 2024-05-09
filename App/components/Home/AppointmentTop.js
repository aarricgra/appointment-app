import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default function AppointmentTop() {
  const [hasAppointment,setHasAppointment] = useState(false)
  const [user,setUser]=useState(null)
  const [date,setDia]= useState("")
  const [time,setHora]= useState("")

  const getUser = async ()=>{
    setUser(JSON.parse(await AsyncStorage.getItem("user")))
  }

  useEffect(()=>{
    getUser()
  },[])

  if(user!=null){
    GlobalApi.getUserAppointments(user.Correo).then((res)=>{
      const info=res.data.data[0].attributes
      const h = info.Hora.split(':')
      const hora= moment().startOf("day").add(h[0],"hours").add(h[1],"minutes").format("HH:mm")
      const date= moment(info.Fecha).format("YYYY-MM-DD")
      const currentDate= moment().format("YYYY-MM-DD")
      if(new Date(date)>new Date(currentDate)){
        setDia(moment(date).format("DD/MM/YYYY"))
        setHora(hora)
        setHasAppointment(true)
      }
    })
  }

  return (
    <View style={styles.contaier}>
      {hasAppointment ? 
      <View style={{display: "flex",alignItems: "center",flexDirection: "row",gap:7}}>
        <Ionicons name="calendar" size={32} color={"white"}/>
        <Text style={styles.text}>Tienes una cita el {date} a las {time}</Text>
      </View>
      :
      <Text style={styles.text}>Aun no tienes ninguna cita</Text>
      }
    </View>
   );
}

const styles = StyleSheet.create({
    contaier:{
        borderRadius:15,
        borderColor:'white',
        borderWidth:5,
        alignItems:'center',
        padding:15,
        marginBottom:15,
        marginHorizontal:Dimensions.get('screen').width*0.025,
        width:Dimensions.get('screen').width*0.95
    },
    text:{
        fontWeight:"bold",
        fontSize:15,
        color:"white"
    }
  })