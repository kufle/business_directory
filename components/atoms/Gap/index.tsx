import { View } from "react-native";
import React from "react";

type Props = {
  width?: number;
  height?: number;
};

export default function Gap({ width, height }: Props) {
  return <View style={{ width: width, height: height }} />;
}
