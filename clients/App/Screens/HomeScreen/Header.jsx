import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      {/* prpfile section */}
      <View style={styles.profileMainContainer}>
        <View style={styles.profileConatiner}>
          <Image
            source={{ uri: "https://picsum.photos/101/101" }}
            style={styles.image}
          />
          <View>
            <Text style={{ color: Colors.WHITE }}>Welcome,</Text>
            <Text style={{ color: Colors.WHITE, fontSize: 20 }}>Guswandi</Text>
          </View>
        </View>
        <FontAwesome name="bookmark-o" size={27} color="white" />
      </View>
      {/* search bar section */}
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.textInput} placeholder="Search" />
        <FontAwesome
          style={styles.searchBtn}
          name="search"
          size={24}
          color={Colors.PRIMARY}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileMainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileConatiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: "85%",
    fontSize: 16,
  },
  searchBarContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  searchBtn: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
});
