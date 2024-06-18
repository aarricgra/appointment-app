import moment from "moment";
import React, { useMemo, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function CustomCalendar({onDay}) {
  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: "Hoy"
  };
  LocaleConfig.defaultLocale="es"

  const today= moment().format("YYYY-MM-DD")
  const [selected, setSelected] = useState(today);
  //Cada vez que se modifique el selected cambiara que dia
  //Esta marcado en el calendario
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true
      },
    }),
    [selected]
  );
  return (
    <View style={{paddingHorizontal:separator,marginVertical:10}}>
      <Text style={styles.title}>Elige fecha</Text>
      <Calendar
      style={{
        backgroundColor:"transparent",
        borderWidth:3,borderColor:"white",
        borderRadius:15
      }}
        onDayPress={(day) => {
          setSelected(moment(day.dateString).format("YYYY-MM-DD"));
          onDay(day.dateString)
        }}
        markedDates={marked}
        theme={{
          calendarBackground: 'transparent',
          dayTextColor: "#fff",
          textDisabledColor: "#444",
          monthTextColor: "#888",
        }}
        firstDay={1}
      />
    </View>
  );
}
const screenWidth=Dimensions.get("screen").width
const separator=parseInt(screenWidth*0.04)
const styles = StyleSheet.create({
    title:{color:"white",marginBottom:10,fontWeight:"bold",fontSize:18}
  });