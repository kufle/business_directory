import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, fonts } from "@/constants";

interface Props {
  name: string;
  address: string;
}

export default function TitleIntro({ name, address }: Props) {
  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.medium,
    color: Colors.light.text,
  },
  address: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
    color: Colors.light.text_muted,
  },
});
