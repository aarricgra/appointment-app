import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../services/GlobalApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Slider({ toSotre, show }) {
  const [products, setProducts] = useState();

  //Coger todas las promociones
  const getPromociones = () =>
    GlobalApi.getPromociones().then((resp) => {
      setProducts(resp.data.data);
    });

  useEffect(() => {
    getPromociones();
  }, []);

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 10,
            color: "white",
            flex: 1,
          }}
        >
          Promociones
        </Text>
        {show ? (
          <TouchableOpacity onPress={() => toSotre()}>
            <Text
              style={{ marginLeft: "auto", marginRight: 10, color: "white" }}
            >
              Ver Todas
            </Text>
          </TouchableOpacity>
        ) : (
          ""
        )}
      </View>

      <FlatList
        data={products}
        horizontal
        renderItem={({ item }) => (
          //Por cada item en productos
          <View>
            {/* Pone su Imagen */}
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
              <Ionicons name={"images"} size={180} color={"white"} style={styles.imgStyle}/>
            )}

            {/* Pone su Oferta en un overlay */}
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>
                Descuento del {item.attributes.Oferta}%
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  imgStyle: {
    width: 180,
    height: 180,
    resizeMode: "stretch",
    borderRadius: 20,
    margin: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    margin: 10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  overlayText: {
    color: "white",
    fontWeight: "bold",
  },
});
