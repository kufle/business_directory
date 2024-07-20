import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, fonts } from "@/constants";

export default function FullLoading() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 24,
  },
  container: {
    backgroundColor: Colors.white,
    width: "100%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    marginTop: 12,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
  },
});
