import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Button, TextInput } from "react-native-paper";
import React, { useState } from "react";

export default function SignUpScreen({ onSignIn }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      // console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].longMessage);
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      // setError(console.error(JSON.stringify(err, null, 2)));
    }
  };

  console.log("err", error);

  return (
    <View>
      {!pendingVerification && (
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "red", padding: 20 }}>{error}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              style={styles.input}
              mode="outlined"
              onChangeText={(email) => setEmailAddress(email)}
              outlineColor="#F3CFC6"
              activeOutlineColor="pink"
            />
          </View>

          <View>
            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={styles.input}
              mode="outlined"
              activeOutlineColor="pink"
              outlineColor="#F3CFC6"
            />
          </View>

          <Button
            style={styles.button}
            mode="contained"
            onPress={onSignUpPress}
          >
            <Text>Sign up</Text>
          </Button>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ textAlign: "center" }}>
              Already have an account?
            </Text>
            <Button mode="text" textColor="#E37383" onPress={onSignIn}>
              Sign In
            </Button>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
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
