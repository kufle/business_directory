import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors, fonts } from "@/constants";
import { Rating } from "react-native-ratings";

const { width } = Dimensions.get("window");

export default function Comment({ comment_rating }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comment</Text>
      <FlatList
        data={comment_rating}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <View style={styles.containerComment}>
            <View style={styles.userContainer}>
              {item.user?.avatar && (
                <Image src={item.user?.avatar} style={styles.avatar} />
              )}
              <Text style={styles.name}>{item.user?.name}</Text>
            </View>
            <Rating
              imageSize={width * 0.04}
              readonly={true}
              style={styles.rating}
              startingValue={item.rating}
            />
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
      />
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
  containerComment: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  avatar: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 50,
  },
  name: {
    fontFamily: fonts.primary.medium,
    color: Colors.light.text,
    fontSize: 16,
  },
  rating: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  comment: {
    marginTop: 10,
    fontFamily: fonts.primary.regular,
    color: Colors.light.text_muted,
  },
});
