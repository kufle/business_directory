import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors, fonts } from "@/constants";

export default function SearchBar() {
  return (
    <View style={styles.search_container}>
      <Ionicons name="search" size={24} color={Colors.PRIMARY} />
      <TextInput placeholder="Search..." style={styles.textInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  search_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
  },
  textInput: {
    color: Colors.light.text,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    padding: 10,
    backgroundColor: Colors.white,
    flex: 1,
  },
});
