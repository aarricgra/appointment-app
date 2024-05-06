import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
  import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from "react-native-gesture-handler";


export default function Headers() {
  const [user,setUser]=useState(null)

  const getUser = async ()=>{
    setUser(JSON.parse(await AsyncStorage.getItem("user")))
  }

  useEffect(()=>{
    getUser()
  },[])

  if(user!=null){
    return (
      <View style={styles.header}>
        <TouchableOpacity style={{backgroundColor:"white",borderRadius:10,padding:5}}>
          <Ionicons name="menu" size={40} color={"black"} />
        </TouchableOpacity>
        <Text style={{ color: "white" ,fontSize:30,fontWeight:"bold",marginLeft:10}}>Hola,</Text>
        <Text style={{ color: "white" ,fontSize:30}}>{user.Nombre}</Text>
        <TouchableOpacity style={{padding:5,marginLeft:120}}>
          <Ionicons name="notifications" size={25} color={"white"} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop:10,
    paddingBottom:15,
    paddingHorizontal:10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
});
