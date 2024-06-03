import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import categoriesData from "../../data/categories";

export default function Category() {
  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryContainer}>
      <Icon name={item.iconName} size={24} color="#4F8EF7" />
      <Text style={styles.categoryText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categoriesData}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 14,
  },
});
