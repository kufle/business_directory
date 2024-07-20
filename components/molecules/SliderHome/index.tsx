import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "@/constants";

const { width, height } = Dimensions.get("window");

interface Props {
  slider: any[];
}

export default function SliderHome({ slider }: Props) {
  return (
    <>
      <FlatList
        data={slider}
        horizontal={true}
        contentContainerStyle={styles.flastlistContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flastlistContainer: {
    padding: 10,
  },
  imageContainer: {
    overflow: "hidden",
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  image: {
    width: width * 0.6, //60%
    height: height * 0.15, //15%
    resizeMode: "cover",
  },
});
