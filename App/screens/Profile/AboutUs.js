import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AboutUs({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.imageText}>Aqui va una imagen</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Sobre CSBarber</Text>
          <Text style={styles.descriptionText}>
            "CSBarber: The Best Solution for Online Barber Bookings" Want a more
            practical and efficient hair shaving experience? CSBarber is the
            best solution for you! CSBarber is an online barber booking
            application that makes it easy for you to search, select and order
            haircut services easily and quickly.
          </Text>
          <TouchableOpacity style={styles.reviewButton} onPress={() => onClick()}>
            <Text style={styles.reviewButtonText}>Puntúa y deja tu reseña</Text>
            <Ionicons name={"arrow-forward-outline"} size={38} color={"#02e071"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Atras</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#171717",
    height: Dimensions.get("screen").height,
  },
  imageContainer: {
    height: Dimensions.get("screen").height * 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    color: "white",
  },
  contentContainer: {
    backgroundColor: "#474747",
    height: Dimensions.get("screen").height * 0.6,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  textContainer: {
    flexDirection: "column",
    gap: 15,
    padding: 30,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionText: {
    color: "white",
    fontSize: 18,
  },
  reviewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#858585",
    paddingVertical: 5,
  },
  reviewButtonText: {
    color: "#02e071",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    borderColor: "#02e071",
    borderWidth: 4,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    width: Dimensions.get("screen").width * 0.8,
    alignSelf: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "#02e071",
    fontWeight: "bold",
    fontSize: 20,
  },
});

