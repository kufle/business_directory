import {
  Dimensions,
  Image,
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Colors, fonts } from "@/constants";
import IStarOn from "@/assets/images/ic-star-on.svg";

const { width, height } = Dimensions.get("window");

type FlexDirection = "column" | "row" | "row-reverse" | "column-reverse";

interface Props {
  item: {
    name: string;
    image: string;
    address: string;
    rating: string;
    category: {
      name: string;
    };
  };
  styleItem?: FlexDirection;
  onPress?: () => void;
}

export default function BusinessItem({
  item,
  styleItem = "column",
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container(styleItem)}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.imageContainer()}>
        <Image
          source={{ uri: item.image }}
          style={styles.image(styleItem)}
          resizeMode="cover"
        />
      </View>
      <View style={styles.titleContainer()}>
        <Text style={styles.title()}>{item.name}</Text>
        <Text style={styles.address()}>{item.address}</Text>
        <View style={styles.wrapper()}>
          <View style={styles.rating()}>
            <IStarOn height={15} width={15} />
            <Text style={styles.textRating()}>{item.rating}</Text>
          </View>
          <Text style={styles.textCategory()}>{item?.category?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  container: (styleItem: FlexDirection): ViewStyle => ({
    marginHorizontal: 10,
    marginVertical: styleItem === "row" ? 10 : 0,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    flexDirection: styleItem,
    alignItems: styleItem === "row" ? "center" : "baseline",
    gap: styleItem === "row" ? 10 : 0,
  }),
  imageContainer: (): ViewStyle => ({
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
  }),
  image: (styleItem: FlexDirection): ImageStyle => ({
    width: styleItem === "row" ? width * 0.33 : width * 0.6, //60%
    height: styleItem === "row" ? height * 0.16 : height * 0.2, //15%
    resizeMode: "cover",
  }),
  titleContainer: (): ViewStyle => ({
    marginTop: 7,
    gap: 2,
    flex: 1,
  }),
  title: (): TextStyle => ({
    fontSize: 16,
    fontFamily: fonts.primary.medium,
    color: Colors.light.text,
  }),
  address: (): TextStyle => ({
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: Colors.light.text_muted,
  }),
  wrapper: (): ViewStyle => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  rating: (): ViewStyle => ({
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  }),
  textRating: (): TextStyle => ({
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.light.text,
  }),
  textCategory: (): TextStyle => ({
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    backgroundColor: Colors.PRIMARY,
    color: Colors.white,
    padding: 3,
    borderRadius: 5,
  }),
};
