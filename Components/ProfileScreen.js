import { View, Text, Image } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { useUser } from "@clerk/clerk-expo";

export function ProfileScreen() {
  const { user } = useUser();
  console.log(JSON.stringify(user, null, 4));
  return (
    <View>
      <View
        style={{ justifyContent: "center", alignItems: "center", padding: 50 }}
      >
        <Image
          source={require("../assets/1.jpeg")}
          style={{ width: 120, height: 120, borderRadius: 100 }}
        ></Image>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            gap: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Erdem Here</Text>
          <Text style={{ color: "gray" }}>
            {user.primaryEmailAddress.emailAddress}
          </Text>
        </View>
      </View>
      <View>
        <TextInput placeholder="firstname"></TextInput>
        <TextInput placeholder="lastname"></TextInput>
        <TextInput placeholder="email"></TextInput>
        <TextInput placeholder="password"></TextInput>
      </View>

      <Button>Update</Button>
    </View>
  );
}
