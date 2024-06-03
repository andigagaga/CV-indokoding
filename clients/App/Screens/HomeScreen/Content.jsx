import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { API_HOST } from "../../Utils/API/index.js";
import Colors from "../../Utils/Colors";
import { useSelector } from "react-redux";
import { calculateTimeDifference } from "../../Utils/TimeUtils.js/TimeUtils.js";

export default function Content() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    getDataProducts();
  }, [searchTerm]);

  const getDataProducts = async () => {
    if (loading) return;

    setLoading(true);

    try {
      let response;
      if (searchTerm) {
        // untuk mencari kunci pencarian
        response = await axios.get(`${API_HOST.url}/api/v1/searchProducts`, {
          params: { search: searchTerm },
        });
      } else {
        // kalau ga ada kunci pencarian maka tampilkan smua products
        response = await axios.get(`${API_HOST.url}/api/v1/getAllProduct`, {
          params: { page, limit: 5 },
        });
      }

      if (searchTerm) {
        console.log("data yang cari", response.data.data);
      }

      const newProducts = response.data.data;

      setProducts((prevProducts) => {
        if (page === 1) {
          return newProducts; // Jika halaman pertama, langsung gunakan data baru
        } else {
          // Jika halaman lebih dari 1, gabungkan produk baru dengan produk sebelumnya
          // Namun, pastikan produk hasil pencarian muncul di atas jika ada
          const filteredNewProducts = prevProducts.filter(
            (prod) => !newProducts.find((newProd) => newProd.id === prod.id)
          );
          return [...newProducts, ...filteredNewProducts]; // Data baru ditempatkan di paling atas
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
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Rp. {item.price.toLocaleString()}</Text>
        <Text style={{ ...styles.postedAt, color: "red" }}>
          Created at: {calculateTimeDifference(item.posted_at)}
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
    paddingBottom: 70,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
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
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginBottom: 5,
  },
  postedAt: {
    fontSize: 12,
    color: "#888",
  },
});
