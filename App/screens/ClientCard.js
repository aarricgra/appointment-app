import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import GlobalApi from "../services/GlobalApi";

const RandomNumberGenerator = () => {
  const [randomPrice, setRandomPrice] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prices, setPrices] = useState([]);
  const [user, setUser] = useState(null);
  const randomPriceRef = useRef(randomPrice);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    randomPriceRef.current = randomPrice;
  }, [randomPrice]);

  const getUserInfo = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      let userInfo = JSON.parse(storedUser);
      let values = [];
      if (
        userInfo.attributes.idRango.data.attributes.Nombre === "Cobre" ||
        userInfo.attributes.idRango.data.attributes.Nombre === "Plata"
      ) {
        values = [0.15, 0.25, 0.50, 1.00];
      } else if (
        userInfo.attributes.idRango.data.attributes.Nombre === "Oro" ||
        userInfo.attributes.idRango.data.attributes.Nombre === "Platino"
      ) {
        values = [0.25, 0.50, 1.00, 1.50];
      } else {
        values = [0.40, 0.80, 1.25, 2.00];
      }
      setPrices(values);
    }
  };

  useEffect(() => {
    let intervalId;

    if (isGenerating) {
      let count = 0;
      intervalId = setInterval(async () => {
        let randomNumber = Math.floor(Math.random() * 100);
        let price;
        if (randomNumber < 50) {
          price = prices[0];
        } else if (randomNumber < 85) {
          price = prices[1];
        } else if (randomNumber < 95) {
          price = prices[2];
        } else {
          price = prices[3];
        }
        setRandomPrice(price);
        randomPriceRef.current = price;

        count++;

        if (count >= 20) {
          clearInterval(intervalId);
          setIsGenerating(false);
          //Copio el user de AsyncStorage
          let modifiedUser = { ...user };
          //Modifico sus valores
          modifiedUser.attributes.Cartera += randomPriceRef.current;
          modifiedUser.attributes.Tickets -= 1;
          //Lo asigno al nuevo con la cartera acutalizada
          await AsyncStorage.setItem("user", JSON.stringify(modifiedUser));
          const data = {
            data: {
              Cartera: modifiedUser.attributes.Cartera,
              Tickets: modifiedUser.attributes.Tickets,
            },
          };
          //Actualizo el de la api
          await GlobalApi.putNewUser(modifiedUser.id, data).then(getUserInfo());
        }
      }, 250);
    }

    return () => clearInterval(intervalId);
  }, [isGenerating]);

  const handleButtonClick = () => {
    setIsGenerating(true);
  };

  if (!user) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
        paddingHorizontal: Dimensions.get("screen").width * 0.05,
      }}
    >
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20, color: "white" }}>
          Saldo actual: {user.attributes.Cartera}€
        </Text>
      </View>
      <View
        style={{ marginTop: 10, width: Dimensions.get("screen").width * 0.6 }}
      >
        <Text style={{ fontSize: 16, marginBottom: 20, color: "white" }}>
          Cada vez que completes una reserva ganaras un ticket, los premios son
          aleatorios y dependen de tu rango
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          width: Dimensions.get("screen").width * 0.4,
          height: Dimensions.get("screen").width * 0.4,
          borderWidth: 3,
          borderColor: "grey",
          padding: 10,
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            marginBottom: 20,
            color: "white",
            textAlign: "center",
          }}
        >
          {randomPrice !== null ? randomPrice + "€" : "????€"}
        </Text>
      </View>

      {user.attributes.Tickets > 0 ? (
        <Button
          title={"Usar ticket 1/" + user.attributes.Tickets}
          onPress={handleButtonClick}
          disabled={isGenerating}
        />
      ) : (
        <Button title="No te quedan tickets" disabled={true} />
      )}
    </View>
  );
};

export default RandomNumberGenerator;
