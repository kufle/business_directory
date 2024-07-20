import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, fonts } from "@/constants";

interface Props {
  about: string;
}

export default function AboutBusiness({ about }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.description}>{about}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary.medium,
    color: Colors.light.text,
  },
  description: {
    fontFamily: fonts.primary.regular,
    color: Colors.light.text_muted,
    lineHeight: 24,
  },
});
