import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, fonts } from "@/constants";

const { width } = Dimensions.get("window");

interface Props {
  user: {
    avatar: string;
    name: string;
    email: string;
  };
}

export default function UserIntro({ user }: Props) {
  return (
    <View style={styles.container}>
      {user?.avatar && (
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
      )}
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 99,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: fonts.primary.medium,
    color: Colors.light.text,
  },
  email: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: Colors.light.text,
  },
});
