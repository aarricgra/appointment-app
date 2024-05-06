import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
  function signOut(){
    AsyncStorage.removeItem("user").then(navigation.navigate("Pro"))
  }
  return (
    <View>
      <TouchableOpacity style={{
        backgroundColor:'#1290ff',
        borderRadius:90,
        alignItems:'center',
        padding:"auto",
        marginTop:140,
        width:Dimensions.get('screen').width*0.8
    }}  onPress={signOut}>
            <Text style={{color:'#fff',fontWeight:'bold'}}>SignOut</Text>
    </TouchableOpacity>
    </View>
  )
}