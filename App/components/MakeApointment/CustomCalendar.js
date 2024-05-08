import moment from "moment";
import React, { useMemo, useState } from "react";
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
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true
      },
    }),
    [selected]
  );
  return (
      <Calendar
        onDayPress={(day) => {
          setSelected(moment(day.dateString).format("YYYY-MM-DD"));
          onDay(day.dateString)
        }}
        markedDates={marked}
        theme={{
          calendarBackground: "#222",
          dayTextColor: "#fff",
          textDisabledColor: "#444",
          monthTextColor: "#888",
        }}
        firstDay={1}
      />
  );
}
