import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ButtonNavigator({ text, img, to, navigation}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <TouchableOpacity style={styles.container} onPress={to}>
        <Image
          source={{
            uri: process.env.EXPO_PUBLIC_API_URL+img,
          }}
          style={styles.imgStyle}
          alt="Imagen promocional"
        />
      </TouchableOpacity>
      <Text style={styles.bText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderWidth: 3,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    borderRadius: 99,
    marginHorizontal: 30,
  },
  imgStyle: {
    width: 24,
    height: 24,
  },
  bText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
  },
});
