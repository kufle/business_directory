import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function Splash() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      try {
        const currentUser = GoogleSignin.getCurrentUser();
        //console.log(currentUser);
        if (currentUser) {
          router.replace("/home");
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.log(error);
        router.replace("/login");
      }
    }, 2000);
  }, [router]);
  console.log("SPLASH");
  return (
    <View style={styles.pages}>
      <Image source={require("@/assets/images/react-logo.png")} />
      <Text>Loading..</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
