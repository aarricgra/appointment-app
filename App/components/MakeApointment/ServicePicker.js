import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function ServicePicker({ service, onchange }) {
  const [services, setServices] = useState();

  useEffect(() => {
    getServicios();
  }, []);

  const getServicios = () =>
    GlobalApi.getServicios().then((resp) => {
      setServices(resp.data.data);
    });

  return (
    <View style={{ paddingHorizontal: separator, marginBottom: 15 }}>
      <Text style={styles.title}>Elige servicio</Text>
      <FlatList
        data={services}
        horizontal
        renderItem={({ item, key }) =>
          item.id == service ? (
            <View style={{borderWidth:1,borderColor:"#02e071",borderRadius:20,margin:10}}>
              <Image
                source={{
                  uri:
                    process.env.EXPO_PUBLIC_API_URL +
                    item.attributes.img.data.attributes.url,
                }}
                style={styles.imgStyle}
                alt="Imagen promocional"
              />
              <View style={styles.overlaySelected}>
              <Ionicons name="checkmark" size={70} color={"#02e071"}/>
                <Text style={styles.overlayText}>{item.attributes.Nombre}</Text>
              </View>
            </View>
          ) : (
            <View style={{margin:10}}>
              <Image
                source={{
                  uri:
                    process.env.EXPO_PUBLIC_API_URL +
                    item.attributes.img.data.attributes.url,
                }}
                style={styles.imgStyle}
                alt="Imagen promocional"
              />
              <TouchableOpacity style={styles.overlay} onPress={()=>onchange(item.id)}>
                <Text style={styles.overlayText}>{item.attributes.Nombre}</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </View>
  );
}

const screenWidth = Dimensions.get("screen").width;
const separator = parseInt(screenWidth * 0.04);
const styles = StyleSheet.create({
  title: { color: "white", marginBottom: 10, fontWeight: "bold", fontSize: 18 },
  imgStyle: {
    width: screenWidth * 0.4,
    height: 130,
    resizeMode: "stretch",
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  overlaySelected: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0)",
    padding: 10,
    margin: 10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayText: {
    color: "white",
    fontWeight: "bold",
  },
});
