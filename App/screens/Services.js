import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import GlobalApi from "../services/GlobalApi";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function () {
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const res = GlobalApi.getServicios();
    setServiceList((await res).data.data);
  };

  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
        paddingHorizontal: Dimensions.get("screen").width * 0.05,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          paddingLeft: 10,
        }}
      >
        Todos los servicios
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {serviceList.map((item, key) => {
          return (
            <View key={key}>
              {/*Si tiene imagen la pone y si no pone un icono */}
              {item.attributes.Imagen.data ? (
                <Image
                  source={{
                    uri:
                      GlobalApi.getBaseUrl() +
                      item.attributes.Imagen.data[0].attributes.url,
                  }}
                  style={styles.imgStyle}
                  alt="Imagen promocional"
                />
              ) : (
                <Ionicons name={"images"} size={Dimensions.get("screen").width * 0.4} color={"white"} style={styles.imgStyle}/>
              )}
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>
                  {item.attributes.Nombre}-
                  {item.attributes.Precio *
                    (1.0 - item.attributes.Oferta / 100)}
                  €
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgStyle: {
    width: Dimensions.get("screen").width * 0.40,
    height: Dimensions.get("screen").width * 0.40,
    resizeMode: "stretch",
    borderRadius: 20,
    margin: Dimensions.get("screen").width * 0.02,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    margin: Dimensions.get("screen").width * 0.02,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  overlayText: {
    color: "white",
    fontWeight: "bold",
  },
});
