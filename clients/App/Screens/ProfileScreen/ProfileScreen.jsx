import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { API_HOST } from "../../Utils/API/index.js";
import Colors from "../../Utils/Colors";
import { AUTH_CHECK } from "../../redux/reducer/AuthSlice";

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

  console.log("data profile data", profileData);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
          dispatch(
            AUTH_CHECK({
              username: response.data.data.username,
              email: response.data.data.email,
              profile_picture: response.data.data.profile_picture,
            })
          );
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
          {profileData.profile_picture ? (
            <Image
              source={{ uri: profileData.profile_picture }}
              style={{ width: 90, height: 90, borderRadius: 99 }}
            />
          ) : (
            <Ionicons name="person-circle" size={90} color={Colors.WHITE} />
          )}
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
