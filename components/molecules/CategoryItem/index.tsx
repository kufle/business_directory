import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors, fonts } from "@/constants";

interface Props {
  category: {
    image: string;
    name: string;
  };
  onPress: () => void;
}

export default function CategoryItem({ category, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: category.image }}
          style={{ height: 30, width: 30 }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    marginHorizontal: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: fonts.primary.medium,
    marginTop: 7,
  },
});
