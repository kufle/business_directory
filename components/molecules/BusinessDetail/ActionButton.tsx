import {
  Alert,
  Dimensions,
  FlatList,
  Linking,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
import ICall from "@/assets/images/call.svg";
import IMap from "@/assets/images/map.svg";
import IWeb from "@/assets/images/web.svg";
import IShare from "@/assets/images/share.svg";
import { Colors, fonts } from "@/constants";

const { width } = Dimensions.get("window");
const sizeIcon = width * 0.09;

interface Props {
  business: {
    contact: string;
    website: string;
    address: string;
    name: string;
  };
}

export default function ActionButton({ business }: Props) {
  const actionButtonMenu = useMemo(
    () => [
      {
        id: 1,
        name: "Call",
        icon: <ICall height={sizeIcon} width={sizeIcon} />,
        url: `tel: ${business?.contact}`,
      },
      {
        id: 2,
        name: "Location",
        icon: <IMap height={sizeIcon} width={sizeIcon} />,
        url: `https://www.google.com/maps/search/?api=1&query=${business?.address.split(/\r?\n/)}`,
      },
      {
        id: 3,
        name: "Web",
        icon: <IWeb height={sizeIcon} width={sizeIcon} />,
        url: `https://${business?.website}`,
      },
      {
        id: 4,
        name: "Share",
        icon: <IShare height={sizeIcon} width={sizeIcon} />,
        url: business?.website,
      },
    ],
    [business],
  );

  const onPressHandle = async (item: any) => {
    if (item.name === "Share") {
      Share.share({
        message: business?.name + "\n Address: " + business.address,
      });
      return;
    }

    try {
      await Linking.openURL(item.url);
    } catch (error: any) {
      Alert.alert("An error occurred", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={actionButtonMenu}
        scrollEnabled={false}
        horizontal
        contentContainerStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => onPressHandle(item)}>
            <View style={{ alignItems: "center" }}>{item.icon}</View>
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: fonts.primary.medium,
    marginTop: 3,
    color: Colors.light.text,
    textAlign: "center",
  },
});
