import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

interface Props {
  image: string;
  onPress?: () => void;
}

export default function Intro({ image, onPress }: Props) {
  return (
    <View>
      <View style={styles.act_container}>
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="arrow-back-circle" size={30} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={30} color="white" />
      </View>
      <Image style={styles.image} source={{ uri: image }} />
    </View>
  );
}

const styles = StyleSheet.create({
  act_container: {
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  image: {
    width: "100%",
    height: height * 0.35,
  },
});
