import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Headers from '../components/Home/Headers';
import SliderPromociones from '../components/Home/SliderPromociones';
import SliderServicios from '../components/Home/SliderServicios';
import ButtonGroup from '../components/Home/ButtonGroup';
import AppointmentTop from '../components/Home/AppointmentTop';
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';


export default function Home() {
  useFocusEffect(()=>{
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
    NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
    setStatusBarHidden(true, "none");
  })
  
  return (
    <View style={{backgroundColor:"#171717",height:Dimensions.get("screen").height}}>
      <Headers/>
      <AppointmentTop/>
      <SliderPromociones/>
      <SliderServicios/>
      <ButtonGroup/>
    </View>
  )
}