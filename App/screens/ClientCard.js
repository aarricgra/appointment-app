import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Dimensions } from 'react-native';

const RandomNumberGenerator = () => {
  const [randomPrice, setRandomPrice] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prices,setPrices]=useState([])
  const [user, setUser] = useState(null);

  useEffect(()=>{
    getUserInfo()
  },[])

  const getUserInfo = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      let userInfo =JSON.parse(storedUser)
      let values = []
      if(userInfo.attributes.idRango.data.id==1||userInfo.attributes.idRango.data.id==2){
        values=[0.15,0.25,0.5,1]
      }else if(userInfo.attributes.idRango.data.id==3||userInfo.attributes.idRango.data.id==4){
        values=[0.25,0.50,1.00,1.50]
      }else {
        values=[0.40,0.80,1.25,2.00]
      }
      setPrices(values)
    }
  };

  useEffect(() => {
    let intervalId;

    if (isGenerating) {
      let count = 0;
      intervalId = setInterval(() => {
        let randomNumber =Math.floor(Math.random() * 100)
        if(randomNumber<50){
            setRandomPrice(prices[0]);
        }else if(randomNumber<85){
            setRandomPrice(prices[1]);
        }else if(randomNumber<95){
            setRandomPrice(prices[2]);
        }else{
            setRandomPrice(prices[3]);
        }
        count++;

        if (count >= 20) { 
          clearInterval(intervalId);
          setIsGenerating(false);
        }
      }, 250); 
    }

    return () => clearInterval(intervalId);
  }, [isGenerating]);

  const handleButtonClick = () => {
    setIsGenerating(true);
  };

  if (!user) {
    return null
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
        paddingHorizontal: Dimensions.get("screen").width * 0.05 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, color:"white"}}>
        {randomPrice !== null ?  randomPrice+"€" : "Premio: "+prices[0]+"€"}
      </Text>
      {
        user.attributes.Tickets>0?
        <Button title={"Usar ticket 1/"+user.attributes.Tickets} onPress={handleButtonClick} disabled={isGenerating} />
        :
        <Button title="No te quedan tickets" onPress={handleButtonClick} disabled={true} />
      }
      
    </View>
  );
};

export default RandomNumberGenerator;

