import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_HOST } from "../../Utils/API/index.js";
import { useNavigation } from "@react-navigation/native";
import Header from "../HomeScreen/Header.jsx";
import * as ImagePicker from "expo-image-picker";

export default function MyContentScreen() {
  const navigation = useNavigation();
  console.log("cek nav nya", navigation);
  const showSearch = false;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
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

  const handleCreateProduct = async () => {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    if (formData.image) {
      const localUri = formData.image;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      form.append("image", { uri: localUri, name: filename, type });
    }

    try {
      const response = await axios.post(
        `${API_HOST.url}/api/v1/product`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigation.navigate("Home");
      return response.data;
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <Header showSearch={showSearch} />
      <View style={styles.content}>
        <Text style={styles.title}>Create Products</Text>
        <View>
          <TextInput
            placeholder="Product Name"
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => handleChange("title", text)}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
          />
          <TextInput
            placeholder="Price"
            style={styles.input}
            value={formData.price}
            onChangeText={(text) => handleChange("price", text)}
          />
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCreateProduct}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: 300,
    borderRadius: 5,
    backgroundColor: "white",
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    borderColor: "black",
  },
  button: {
    marginTop: 20,
    marginLeft: 8,
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 99,
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
