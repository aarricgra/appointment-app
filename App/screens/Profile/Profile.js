import { View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileUserinfo from "../../components/Profile/ProfileUserinfo";
import ProfileMenu from "../../components/Profile/ProfileMenu";

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(false);

  const getUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
  };

  useEffect(() => {
    getUser();
  }, []);

  function logOut() {
    AsyncStorage.removeItem("user").then(navigation.navigate("Pro"));
  }

  if (user == null) return null;

  return (
    <View
      style={{
        backgroundColor: "#171717",
        height: Dimensions.get("screen").height,
      }}
    >
      <ProfileUserinfo user={user} />
      <ProfileMenu
        notifications={notifications}
        onLogOut={() => logOut()}
        onNotificationPress={() => setNotifications(!notifications)}
        toAbouUs={() => navigation.navigate("AboutUs")}
        toContactUs={()=>navigation.navigate("ContactUs")}
        toMyAccount={()=>navigation.navigate("MyAccount")}
      />
    </View>
  );
}
