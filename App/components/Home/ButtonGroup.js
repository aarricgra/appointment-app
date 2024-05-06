import { View, Text, FlatList, Image, Dimensions, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";
import { TouchableOpacity } from "react-native";

export default function Slider() {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    getBotones();
  }, []);

  const getBotones = () =>
    GlobalApi.getBotones().then((resp) => {
      setButtons(resp.data.data);
    });

  function splitText(text){
    let a =""
    if(text.includes(" ")){
      return text.split(" ")
    }else{
      return [text]
    }
  }

  return (
    <View style={{display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",marginVertical:10}}>
      {buttons.map((item, index) => (
        <View style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          marginBottom:10
        }} key={index}>
          <TouchableOpacity style={styles.container}>
            <Image
              source={{
                uri: process.env.EXPO_PUBLIC_API_URL + item.attributes.img.data.attributes.url
              }}
              style={styles.imgStyle}
              alt="Imagen promocional"
            />
            
            
          </TouchableOpacity>
          <Text style={styles.bText}>{item.attributes.texto}</Text>
        </View>
        ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    borderColor:'white',
    borderWidth:3,
    width:70,
    height:70,
    alignItems:"center",
    justifyContent:"center",
    display:"flex",
    borderRadius:99,
    marginHorizontal:30,

  },
  imgStyle: {
    width: 24,
    height: 24
  },
  bText: {
    fontWeight:"bold",
    fontSize:12,
    color:"white"
  },
});
