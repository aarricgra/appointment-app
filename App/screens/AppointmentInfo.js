import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../services/GlobalApi'

export default function AppointmentInfo({ route }) {
  const [appoitment, setAppoitment] = useState(null)
  const [servicio, setServicio] = useState(null)

  const getAppointment = () => {
    GlobalApi.getAppoitmentById(route.params.id).then((res) => {
      setAppoitment(res.data.data[0].attributes)
    })
  }

  useEffect(() => {
    getAppointment()
  }, [])

  useEffect(() => {
    if (appoitment != null) {
      GlobalApi.getServiceById(appoitment.idServicio.data.id).then((res2) => {
        setServicio(res2.data.data[0].attributes)
      })
    }
  }, [appoitment])

  if (appoitment != null && servicio != null) {
    return (
      <View style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
      }}>
        <Text style={{ color: "white" }}>Fecha {appoitment.Fecha}</Text>
        <Text style={{ color: "white" }}>Hora {appoitment.Hora}</Text>
        <Text style={{ color: "white" }}>Servicio Nombre: {servicio.Nombre}</Text>
        <Text style={{ color: "white" }}>Servicio Descripcion: {servicio.Descripcion}</Text>
        <Text style={{ color: "white" }}>Servicio Duracion: 25 min</Text>
        <Text style={{ color: "white" }}>Servicio Precio: {servicio.Precio} €</Text>
      </View>
    )
  } else {
    return null
  }
}
