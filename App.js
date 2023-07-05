import "react-native-gesture-handler";
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./Components/HomeScreen";
import { Details } from "./Components/DetailsScreen";
import { Comments } from "./Components/CommentScreen";
import { PaperProvider } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { LoginFlow } from "./Components/LoginFlow";

export default function App() {
  const Drawer = createDrawerNavigator();
  const CLERK_PUBLISHABLE_KEY =
    "pk_test_bW9yYWwtbW9yYXktNjEuY2xlcmsuYWNjb3VudHMuZGV2JA";
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <PaperProvider>
          <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen
                name="Home"
                component={Tab}
                options={{ headerShown: false }}
              />
              <Drawer.Screen name="Article" component={Article} />
            </Drawer.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SignedIn>
      <SignedOut>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LoginFlow></LoginFlow>
        </View>
      </SignedOut>
    </ClerkProvider>
  );
}

function Tab() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Stack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
function Article() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Article!</Text>
    </View>
  );
}

function Stack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
