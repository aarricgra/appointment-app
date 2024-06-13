import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Membership({ rango }) {
  let membershipStyle = {};
  if (rango.id ==1) {
    membershipStyle = { backgroundColor:"#c7863c" };
  } else if (rango.id ==2) {
    membershipStyle = { backgroundColor:"#d9d9d9" };
  } else if (rango.id ==3) {
    membershipStyle = { backgroundColor:"#e8dc00" };
  } else if (rango.id ==4) {
    membershipStyle = { backgroundColor:"#34c981" };
  } else {
    membershipStyle = { backgroundColor:"#4ed9e6" };
  }

  return (
    <View style={{display:"flex",flexDirection:"row"}}>
      <TouchableOpacity style={[membershipStyle, styles.membershipButton]}>
        <Ionicons name="trophy" size={18} color={"white"} />
        <Text style={{ color:"white", fontWeight:"bold" }}>
          {rango.attributes.Nombre}
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
