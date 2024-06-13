import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../services/GlobalApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Appointment() {
  const [nextAppointments, setNextAppointments] = useState([]);
  const [lastAppointments, setLastAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [selected,setSelected]=useState(1)

  const getUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const getUserLastAppointments = async (email) => {
    try {
      const resp = await GlobalApi.getUserLastAppointments(email);
      setLastAppointments(resp.data.data);
    } catch (error) {
      console.error("Error fetching user last appointments:", error);
    }
  };

  const getUserNextsAppointments = async (email) => {
    try {
      const resp = await GlobalApi.getUserNextsAppointments(email);
      setNextAppointments(resp.data.data);
    } catch (error) {
      console.error("Error fetching user last appointments:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user && user.attributes && user.attributes.Correo) {
      getUserLastAppointments(user.attributes.Correo);
      getUserNextsAppointments(user.attributes.Correo);
    }
  }, [user]);

  return (
    <View style={{
      backgroundColor: "#171717",
      height: Dimensions.get("screen").height
    }}>
      <View style={{ display: "flex", flexDirection: "row",justifyContent:"center",marginTop:20,gap:Dimensions.get("screen").width*0.05}}>
        <TouchableOpacity style={{width:Dimensions.get("screen").width*0.45,borderBottomColor:"grey",borderBottomWidth:1,paddingBottom:10}} onPress={()=>setSelected(1)}>
          <Text style={{color: selected === 1 ? "#02e071" : "white",fontWeight:"bold",fontSize:20,textAlign:"center"}}>Proximas Reservas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:Dimensions.get("screen").width*0.45,borderBottomColor:"grey",borderBottomWidth:1,paddingBottom:10}} onPress={()=>setSelected(2)}>
          <Text style={{color: selected === 2 ? "#02e071" : "white",fontWeight:"bold",fontSize:20,textAlign:"center"}}>Historial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
