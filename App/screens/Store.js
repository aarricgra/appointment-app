import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import SliderPromociones from "../components/Home/SliderPromociones";
import GlobalApi from "../services/GlobalApi";

export default function () {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);

  //Cada vez que se actualice search
  //actualiza los productos
  useEffect(() => {
    getProducts();
  }, [search]);

  const getProducts = async () => {
    const res = GlobalApi.getProductosFiltered(search);
    setProductList((await res).data.data);
  };

  function handleChange(value) {
    setSearch(value);
  }
  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
        paddingHorizontal: Dimensions.get("screen").width * 0.05
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderColor: "grey",
          borderWidth: 2,
          borderRadius: 10,
          padding: 5,marginVertical:10
        }}
      >
        <Ionicons name="search" size={30} color={"white"} />
        <TextInput
          style={{ paddingHorizontal: 10, color: "white", flex: 3}}
          placeholder="Buscar..."
          placeholderTextColor={"white"}
          onChangeText={(value) => handleChange(value)}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SliderPromociones />
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          paddingLeft:10
        }}
      >
        Todos los productos
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {productList.map((item, key) => {
          return (
            <View key={key}>
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
    width: Dimensions.get("screen").width * 0.4,
    height: Dimensions.get("screen").width * 0.4,
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
