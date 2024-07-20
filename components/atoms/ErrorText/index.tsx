import { Text, TextStyle } from "react-native";
import React from "react";
import { Colors, fonts } from "@/constants";

type TextAlign = "left" | "auto" | "right" | "center" | "justify";

interface Props {
  label: string;
  align?: TextAlign;
}

export default function ErrorText({ label = "Error", align }: Props) {
  return <Text style={styles.text(align)}>{label}</Text>;
}

const styles = {
  text: (align: TextAlign = "left"): TextStyle => ({
    color: Colors.danger,
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    textAlign: align,
  }),
};
