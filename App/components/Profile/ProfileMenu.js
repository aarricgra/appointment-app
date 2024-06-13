import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Switch,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileMenu({ notifications, onLogOut, onNotificationPress,toAbouUs, toContactUs, toMyAccount }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Ajustes</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Notificaciones</Text>
          <Switch
            thumbColor={"#02e071"}
            value={notifications}
            onValueChange={() => onNotificationPress()}
          />
        </View>
        <MenuItem title="Mi cuenta" iconName="arrow-forward-outline" onClick={()=>toMyAccount()}/>
        <MenuItem title="Ayuda" iconName="arrow-forward-outline" onClick={()=>toContactUs()}/>
        <MenuItem title="Sobre nosotros" iconName="arrow-forward-outline" onClick={()=>toAbouUs()}/>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => onLogOut()}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MenuItem = ({ title, iconName, onClick }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={()=>onClick()}>
      <Text style={styles.itemText}>{title}</Text>
      <Ionicons name={iconName} size={38} color={"#02e071"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#474747",
    height: Dimensions.get("screen").height * 0.7,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  content: {
    flexDirection: "column",
    gap: 15,
    padding: 30,
  },
  heading: {
      color: "white",
      fontSize: 18,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#858585",
    paddingVertical: 5,
  },
  itemText: {
    color: "#02e071",
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    borderColor: "#02e071",
    borderWidth: 4,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    width: Dimensions.get("screen").width * 0.8,
    alignSelf: "center",
    marginTop: 10,
  },
  logoutText: {
    color: "#02e071",
    fontWeight: "bold",
    fontSize: 20,
  },
});