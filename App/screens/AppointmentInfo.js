import { View, Text, Dimensions, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../services/GlobalApi";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";

export default function AppointmentInfo({ route,navigation }) {
  const [appoitment, setAppoitment] = useState(null);
  const [servicio, setServicio] = useState(null);

  const getAppointment = () => {
    GlobalApi.getAppoitmentById(route.params.id).then((res) => {
      setAppoitment(res.data.data[0].attributes);
    });
  };

  useEffect(() => {
    getAppointment();
  }, []);

  useEffect(() => {
    if (appoitment != null) {
      GlobalApi.getServiceById(appoitment.idServicio.data.id).then((res2) => {
        setServicio(res2.data.data[0].attributes);
      });
    }
  }, [appoitment]);

  async function deleteAppointment(){
    await GlobalApi.deleteAppointment(route.params.id).then(navigation.goBack())
  }


  if (appoitment != null && servicio != null) {
    return (
      <View
        style={{
          backgroundColor: "#171717",
          height: Dimensions.get("screen").height,
          paddingHorizontal: Dimensions.get("screen").width * 0.05,
          display: "flex",
          flexDirection: "column",
          gap:10
        }}
      >
        <View>
          <Image
            source={
              (source = {
                uri:
                  GlobalApi.getBaseUrl() +
                  servicio.Imagen.data[0].attributes.url,
              })
            }
            width={Dimensions.get("screen").width * 0.4}
            height={Dimensions.get("screen").width * 0.4}
            style={{ alignSelf: "center", borderRadius: 20 }}
          />
          <Text style={{ color: "white",textAlign:"center",marginTop:10,fontSize:18}}>
            {servicio.Nombre}
        </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap:5, justifyContent:"center",alignItems:"center"}}>
          <Ionicons name="calendar" size={30} color={"white"} />
          <Text style={{ color: "white",fontSize:16}}>
            {moment(appoitment.Fecha).format("DD/MM/YYYY")}
          </Text>
          <Text style={{ color: "white",fontSize:16 }}>
            {moment(appoitment.Hora, "HH:mm:sss").format("HH:mm")}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap:5, justifyContent:"center",alignItems:"center"}}>
          <View style={{ display: "flex", flexDirection: "row", gap:5, justifyContent:"center",alignItems:"center",flex:1}}>
            <Ionicons name="time" size={20} color={"white"} />
            <Text style={{ color: "white",fontSize:16}}>
            25 min
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap:5, justifyContent:"center",alignItems:"center",flex:1}}>
            <Ionicons name="pricetag" size={20} color={"white"} />
            <Text style={{ color: "white",fontSize:16}}>
            {appoitment.Coste}€
            </Text>
          </View>
        </View>
        {
          moment()<moment(appoitment.Fecha+" "+appoitment.Hora,"YYYY-MM-DD HH:mm:sss")?
          <View style={{marginTop:20,display:"flex",flexDirection:"row",justifyContent:"center"}}>
          <Button title="Cancelar cita" accessibilityState={{alignSelf:"center"}} onPress={()=>deleteAppointment()}>
          </Button>
        </View>
          :
          ""
        }
        
        
      </View>
    );
  } else {
    return null;
  }
}
