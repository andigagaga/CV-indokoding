import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import ContentData from "../../data/destinations.json";

export default function Content() {
  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.details}>
        Location: {item.location} | Rating: {item.rating} | Price: ${item.price}{" "}
        | Duration: {item.duration} days
      </Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={ContentData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  details: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});
