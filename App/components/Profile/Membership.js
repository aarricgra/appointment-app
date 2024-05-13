import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Membership({ puntos }) {
  let membershipStyle = {};
  if (puntos < 1000) {
    membershipStyle = { backgroundColor:"#c7863c" };
  } else if (puntos < 2000) {
    membershipStyle = { backgroundColor:"#d9d9d9" };
  } else if (puntos < 4000) {
    membershipStyle = { backgroundColor:"#e8dc00" };
  } else if (puntos < 8000) {
    membershipStyle = { backgroundColor:"#34c981" };
  } else {
    membershipStyle = { backgroundColor:"#4ed9e6" };
  }

  return (
    <View style={{display:"flex",flexDirection:"row"}}>
      <TouchableOpacity style={[membershipStyle, styles.membershipButton]}>
        <Ionicons name="trophy" size={18} color={"white"} />
        <Text style={{ color:"white", fontWeight:"bold" }}>
          {puntos < 1000 ? "Bronce" : puntos < 2000 ? "Plata" : puntos < 4000 ? "Oro" : puntos < 8000 ? "Platino" : "Diamante"}
        </Text>
      </TouchableOpacity>
      <View><Text></Text></View>
    </View>
  );
}

const styles = {
  membershipButton: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "auto", 
  },
};
