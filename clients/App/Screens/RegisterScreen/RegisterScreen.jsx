import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_HOST } from "../../Utils/API/index.js";
import Colors from "../../Utils/Colors";
import * as ImagePicker from "expo-image-picker";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profile_picture: null,
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleRegister = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    if (formData.image) {
      const localUri = formData.image;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      form.append("profile_picture", { uri: localUri, name: filename, type });
    }

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
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  console.log("data user", formData);
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
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Profile Picture</Text>
      </TouchableOpacity>
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
