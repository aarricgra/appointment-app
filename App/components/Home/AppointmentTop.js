import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      const dia=info.Fechor.substring(8,10)
      const mes=info.Fechor.substring(5,7)
      const año=info.Fechor.substring(0,4)
      const hora=info.Fechor.substring(11,16)
      const date= new Date(año+"-"+mes+"-"+dia)
      const currentDate= new Date()
      if(date>currentDate){
        setDia( dia+"/"+mes+"/"+año)
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