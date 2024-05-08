import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import Screens from "./App/navigations/Screens";
import { setStatusBarHidden } from "expo-status-bar";
import { LocaleConfig } from "react-native-calendars";

export default function App() {
  NavigationBar.setPositionAsync("absolute");
  NavigationBar.setVisibilityAsync("hidden");
  NavigationBar.setBehaviorAsync("overlay-swipe");
  NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
  setStatusBarHidden(true, "none");
  return (
    <NavigationContainer>
      <Screens />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#171717",
  },
});
