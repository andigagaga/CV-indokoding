import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import TabNavigation from "./App/Navigations/TabNavigation";
import LoginScreen from "./App/Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./App/Screens/RegisterScreen/RegisterScreen";
import SplaceScreen from "./App/Screens/SplaceScreen/SplaceScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./App/redux/store";
import MyContentScreen from "./App/Screens/BookingScreen/MyContentScreen";

const Stack = createStackNavigator();

const store = configureStore({
  reducer: RootReducer,
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="content"
            component={MyContentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Content"
            component={SplaceScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
