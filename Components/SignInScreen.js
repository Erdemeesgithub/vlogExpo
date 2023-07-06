import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { TextInput, Button } from "react-native-paper";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [error, setError] = useState();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].longMessage);
    }
  };

  return (
    <View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "red",
            padding: 20,
          }}
        >
          {error}
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Text style={styles.title}>Sign In</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailAddress}
          mode="outlined"
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          outlineColor="#F3CFC6"
          activeOutlineColor="pink"
        />
      </View>

      <View>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          mode="outlined"
          activeOutlineColor="pink"
          outlineColor="#F3CFC6"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Button style={styles.button} mode="contained" onPress={onSignInPress}>
        <Text>Sign in</Text>
      </Button>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ textAlign: "center" }}>Don't have an account?</Text>
        <Button mode="text" textColor="#E37383">
          Sign Up
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    marginBottom: 30,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFB6C1",
  },
  button: {
    backgroundColor: "#FFB6C1",
  },
});
