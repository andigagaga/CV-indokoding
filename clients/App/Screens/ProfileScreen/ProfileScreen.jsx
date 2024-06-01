import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_HOST } from "../../Utils/API/index.js";
import { useNavigation } from "@react-navigation/native";

const profileMenu = [
  {
    id: 1,
    name: "Home",
    icon: "home",
  },
  {
    id: 2,
    name: "my content",
    icon: "bookmark-sharp",
  },
  {
    id: 3,
    name: "contact us",
    icon: "chatbox-ellipses",
  },
  {
    id: 4,
    name: "logout",
    icon: "log-out",
  },
];

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            `${API_HOST.url}/api/v1/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setProfileData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      alert("Logout success");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!profileData) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.PRIMARY,
        }}
      >
        <Text style={{ color: Colors.WHITE, fontSize: 20 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: Colors.WHITE }}>
          Profile
        </Text>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Image
            source={{ uri: profileData.profile_picture }}
            style={{ width: 90, height: 90, borderRadius: 99 }}
          />
          <Text
            style={{
              fontSize: 26,
              fontWeight: "medium",
              marginTop: 8,
              color: Colors.WHITE,
            }}
          >
            {profileData.username}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "medium",
              marginTop: 8,
              color: Colors.WHITE,
            }}
          >
            {profileData.email}
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: 100 }}>
        <FlatList
          data={profileMenu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => (item.name === "logout" ? handleLogout() : null)}
            >
              <View
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                  paddingHorizontal: 80,
                }}
              >
                <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
                <Text style={{ color: Colors.PRIMARY, fontSize: 20 }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
