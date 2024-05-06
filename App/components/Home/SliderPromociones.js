import { View, Text, FlatList, Image, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";

export default function Slider() {
  const [promotions, setPromotions] = useState();

  useEffect(() => {
    getPromociones();
  }, []);

  const getPromociones = () =>
    GlobalApi.getPromociones().then((resp) => {
      setPromotions(resp.data.data);
    });

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 ,color:"white"}}>
          Promociones
        </Text>
        <Text style={{ marginLeft: "auto", marginRight: 10, color:"white" }}>Ver Todas</Text>
      </View>
      <FlatList
        data={promotions}
        horizontal
        renderItem={({ item }) => (
          <View>
            <Image
              source={{
                uri: process.env.EXPO_PUBLIC_API_URL + item.attributes.img.data[0].attributes.url,
              }}
              style={styles.imgStyle}
              alt="Imagen promocional"
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>{item.attributes.descripcion}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  imgStyle: {
    width: 290,
    height: 180,
    resizeMode: "stretch",
    borderRadius: 20,
    margin: 10,
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
  },
});
