import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
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
import { ProfileScreen } from "./Components/ProfileScreen";
import { Card } from "react-native-paper";
import { useUser } from "@clerk/clerk-expo";

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
                name="Stack"
                component={Stack}
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={Profile} />
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
      <Stack.Screen
        name="Home"
        component={Tab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
// function ProfileStack() {
//   const Stack = createNativeStackNavigator();
//   return (
//     <Stack.Navigator>

//     </Stack.Navigator>
//   );

// }

function Profile({ navigation }) {
  const { user } = useUser();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProfileScreen");
      }}
    >
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Card style={{ width: 370 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              padding: 20,
            }}
          >
            <Image
              source={require("./assets/1.jpeg")}
              style={{ width: 50, height: 50, borderRadius: 100 }}
            ></Image>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>Username</Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
                {user.primaryEmailAddress.emailAddress}
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </TouchableOpacity>
  );
}
