import React from "react";
import { View } from "react-native";
import Category from "./Category";
import Content from "./Content";
import Header from "./Header";

export default function HomeScreen() {
  const showSearch = true;
  return (
    <View style={{ marginVertical: 30 }}>
      <Header showSearch={showSearch} />
      <View style={{ padding: 20 }}>
        <Category />
      </View>
      <View style={{ padding: 20 }}>
        <Content />
      </View>
    </View>
  );
}
