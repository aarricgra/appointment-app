import { View, Text, FlatList, Image, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";

export default function Slider() {
  const [services, setServices] = useState();

  useEffect(() => {
    getServicios();
  }, []);

  const getServicios = () =>
    GlobalApi.getServicios().then((resp) => {
      setServices(resp.data.data);
    });

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10, color:"white" }}>
          Servicios
        </Text>
        <Text style={{ marginLeft: "auto", marginRight: 10, color : "white" }}>Ver Todos</Text>
      </View>
      <FlatList
        data={services}
        horizontal
        renderItem={({ item }) => (
          <View>
            <Image
              source={{
                uri: process.env.EXPO_PUBLIC_API_URL + item.attributes.img.data.attributes.url,
              }}
              style={styles.imgStyle}
              alt="Imagen promocional"
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>{item.attributes.Nombre}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  imgStyle:{
    width: 290/2,
    height: 180/1.5,
    resizeMode: "stretch",
    borderRadius: 20,
    margin: 10
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    right:0,
    left:0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    margin:10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius:20
  },
  overlayText: {
    color: "white",
    fontWeight:"bold"
}});