import React, { useMemo, useState } from "react";
import { Calendar } from "react-native-calendars";
import MyFunctions from "../../services/MyFunctions";

export default function CustomCalendar({onDay}) {
  const [selected, setSelected] = useState(MyFunctions.getCurrentDate());
  console.log(MyFunctions.getCurrentDate().toLocaleDateString());
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
      },
    }),
    [selected]
  );
  return (
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
          onDay(day.dateString)
        }}
        markedDates={marked}
        theme={{
          calendarBackground: "#222",
          dayTextColor: "#fff",
          textDisabledColor: "#444",
          monthTextColor: "#888",
        }}
      />
  );
}
