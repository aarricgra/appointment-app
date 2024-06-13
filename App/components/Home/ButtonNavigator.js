import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ButtonNavigator({ text, image, to, navigation}) {
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
        <Ionicons name={image} size={30} color={"white"} />
      </TouchableOpacity>
      <Text style={styles.bText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderWidth: 3,
    width: Dimensions.get("screen").width*0.15,
    height: Dimensions.get("screen").width*0.15,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    borderRadius: 99,
    marginHorizontal: Dimensions.get("screen").width*0.09,
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
