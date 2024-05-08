import React, { useMemo, useState } from "react";
import { Calendar } from "react-native-calendars";

export default function CustomCalendar({onDay}) {
  const [selected, setSelected] = useState("");
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
