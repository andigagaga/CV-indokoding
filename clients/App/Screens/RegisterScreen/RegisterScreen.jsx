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
import Colors from "../../Utils/Colors";
import { API_HOST } from "../../Utils/API/index.js";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profile_picture: null,
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleRegister = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);

    try {
      const response = await axios.post(
        `${API_HOST.url}/api/v1/user/register`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
        Register
      </Text>
      <TextInput
        placeholder="Username"
        style={styles.textInput}
        value={formData.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.textInput}
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.textInput}
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={{ color: Colors.WHITE, fontSize: 15, fontWeight: "bold" }}>
          Register
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={{ color: Colors.WHITE }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: "green",
              fontSize: 15,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Login
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
