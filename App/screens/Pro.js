import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react'

export default function Pro({navigation}) {
  useFocusEffect(()=>{
    const getData = async () => {
      try {
        const info = await AsyncStorage.getItem('user');
        if (info) {
            navigation.navigate("MainStack");
        } else {
            navigation.navigate("LoginHub");
        }
      } catch (error) {
        console.error("Error al obtener datos de usuario:", error);
      }
    };

    getData();
  })
        
}