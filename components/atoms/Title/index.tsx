import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors, fonts } from "@/constants";

type FontWeightType = "regular" | "medium" | "bold";
interface Props {
  title: string;
  onPress?: () => void;
  fontSize: number;
  fontWeight?: FontWeightType | undefined;
}

export default function Title({ title, onPress, fontSize, fontWeight }: Props) {
  return (
    <View style={styles.titleContainer()}>
      <Text style={styles.title(fontSize, fontWeight)}>{title}</Text>
      {onPress && (
        <>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.link()}>View All</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const getFontWeight = (type: string | undefined) => {
  switch (type) {
    case "regular":
      return fonts.primary.regular;
    case "medium":
      return fonts.primary.medium;
    case "bold":
      return fonts.primary.bold;
    default:
      return fonts.primary.regular;
  }
};

const styles = {
  titleContainer: (): TextStyle => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  title: (fontSize: number, fontWeight: string | undefined): TextStyle => ({
    fontSize: fontSize,
    fontFamily: getFontWeight(fontWeight),
    color: Colors.light.text,
  }),
  link: (): TextStyle => ({
    fontSize: 14,
    fontFamily: fonts.primary.medium,
    color: Colors.PRIMARY,
  }),
};
