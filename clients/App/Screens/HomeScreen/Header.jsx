import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../Utils/Colors";
import { setSearchTerm } from "../../redux/reducer/ProductSlice";

export default function Header({ showSearch }) {
  const dispatch = useDispatch();
  const authProfile = useSelector((state) => state.auth);
  const searchText = useSelector((state) => state.search.searchTerm);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    dispatch(setSearchTerm(searchInput)); // Dispatch the action directly
  };

  return (
    <View style={styles.container}>
      {/* prpfile section */}
      <View style={styles.profileMainContainer}>
        <View style={styles.profileConatiner}>
          <Image
            source={{ uri: authProfile.profile_picture }}
            style={styles.image}
          />
          <View>
            <Text style={{ color: Colors.WHITE }}>Welcome,</Text>
            <Text style={{ color: Colors.WHITE, fontSize: 20 }}>
              {authProfile.username}
            </Text>
          </View>
        </View>
        <FontAwesome name="bookmark-o" size={27} color="white" />
      </View>
      {/* search bar section */}
      {showSearch && (
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Search"
            value={searchInput}
            onChangeText={setSearchInput}
          />
          <FontAwesome
            style={styles.searchBtn}
            name="search"
            size={24}
            color={Colors.PRIMARY}
            onPress={handleSearch}
          />
        </View>
      )}
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
