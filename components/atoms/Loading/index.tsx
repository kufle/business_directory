import { ActivityIndicator } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <ActivityIndicator style={{ flex: 1, alignItems: "center" }} size={50} />
  );
}
