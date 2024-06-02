import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ContentData from "../../data/destinations.json";
import axios from "axios";
import { API_HOST } from "../../Utils/API/index.js";
import Colors from "../../Utils/Colors";

export default function Content() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getDataProducts();
  }, []);

  const getDataProducts = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.get(`${API_HOST.url}/api/v1/getAllProduct`, {
        params: { page, limit: 5 },
      });
      const newProducts = response.data.data;

      setProducts((prevproducts) => {
        if (page === 1) {
          return newProducts;
        } else {
          return [...prevproducts, ...newProducts];
        }
      });

      setPage(page + 1);
      if (newProducts.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View>
        <ActivityIndicator size={50} color={Colors.PRIMARY} />
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View key={item.id} style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.details}>
          Price : ${item.price} | Posted at : {""}
          {new Date(item.posted_at).toLocaleString()}
        </Text>
      </View>
    </View>
  );

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      getDataProducts();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setProducts([]);
    setHasMore(true);
    getDataProducts().finally(() => setRefreshing(false));
  };

  return (
    <View>
      {loading && <ActivityIndicator size={50} color={Colors.PRIMARY} />}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refresh}
        onRefresh={handleRefresh}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  itemContainer: {
    marginBottom: 10,
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
