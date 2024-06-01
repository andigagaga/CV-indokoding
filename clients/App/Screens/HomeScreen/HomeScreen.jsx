import { View, Text } from "react-native";
import React from "react";
import Header from "./Header";
import Content from "./Content";
import Category from "./Category";

export default function HomeScreen() {
  return (
    <View>
      <Header />
      <View style={{ padding: 20 }}>
        <Category />
      </View>
      <View style={{ padding: 20 }}>
        <Content />
      </View>
    </View>
  );
}
