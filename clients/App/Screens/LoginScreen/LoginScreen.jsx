import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_HOST } from "../../Utils/API/index.js";
import Colors from "../../Utils/Colors";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${API_HOST.url}/api/v1/user/login`,
        formData
      );

      // Simpan token ke AsyncStorage
      await AsyncStorage.setItem("token", response.data.token);
      // Handle response dari server di sini
      console.log(response.data);

      navigation.navigate("Home");
      return response.data.data;
    } catch (error) {
      // Handle error di sini
      console.error("Error during login:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: Colors.WHITE,
          fontSize: 40,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Logins
      </Text>
      <TextInput
        placeholder="Email"
        style={styles.textInput}
        value={formData.email}
        onChangeText={(e) => handleChange("email", e)}
      />
      <TextInput
        placeholder="Password"
        style={styles.textInput}
        value={formData.password}
        onChangeText={(e) => handleChange("password", e)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: Colors.WHITE, fontSize: 15, fontWeight: "bold" }}>
          Login
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={{ color: Colors.WHITE }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              color: "red",
              fontSize: 15,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    gap: 12,
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: "85%",
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.BLACK,
    padding: 15,
    borderRadius: 99,
    marginTop: 20,
    width: "85%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
