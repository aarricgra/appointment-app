import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //TextInputField
  TextInputField_slot: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  TextInputField_input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#171717",
  },
  TextInputField_inputContainer: {
    flexDirection: "row",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  //EmailRegister
  EmailRegister_container: {
    backgroundColor: "#171717",
    height: Dimensions.get("screen").height,
  },
  EmailRegister_title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 7,
    color: "white",
  },
  EmailRegister_subtitle: {
    fontSize: 18,
    color: "white",
  },
  EmailRegister_waring: {
    color: "red",
    marginTop: -15,
    marginBottom: 10,
  },
  EmailRegister_button: {
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    width: "auto",
    borderRadius: 10,
    marginTop: 10,
  },
  EmailRegister_toLoginContaier:{
    marginTop: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 3,
  }
});

export default styles;
