import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function SplaceScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("./../../../assets/images/login.png")}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text
          style={{ fontSize: 27, color: Colors.WHITE, textAlign: "center" }}
        >
          Lets Find{" "}
          <Text style={{ fontWeight: "bold" }}>
            Profesional Cleaning and Repair
          </Text>{" "}
          Services
        </Text>
        <Text
          style={{ fontSize: 10, color: Colors.WHITE, textAlign: "center" }}
        >
          Best app to find services near you which deliver you a professional
          services
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{ textAlign: "center", fontSize: 17, color: Colors.PRIMARY }}
          >
            Lets Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.BLACK,
  },
  subContainer: {
    width: "100%",
    backgroundColor: Colors.PRIMARY,
    height: "70%",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 99,
    marginTop: 20,
  },
});
