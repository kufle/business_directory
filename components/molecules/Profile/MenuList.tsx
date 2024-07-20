import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import IAddBusiness from "@/assets/images/add_building.svg";
import IInfoBusiness from "@/assets/images/info_building.svg";
import IShare from "@/assets/images/share_link.svg";
import IPower from "@/assets/images/power.svg";
import { Colors, fonts } from "@/constants";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const iconsize = width * 0.11;

export default function MenuList() {
  const router = useRouter();

  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: <IAddBusiness width={iconsize} height={iconsize} />,
      path: "/business/AddBusiness",
    },
    {
      id: 2,
      name: "My Business",
      icon: <IInfoBusiness width={iconsize} height={iconsize} />,
      path: "",
    },
    {
      id: 3,
      name: "Share App",
      icon: <IShare width={iconsize} height={iconsize} />,
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: <IPower width={iconsize} height={iconsize} />,
      path: "",
    },
  ];

  const onMenuClick = (item: any) => {
    router.push(item.path);
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={menuList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onMenuClick(item)}
          >
            <View>{item.icon}</View>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -10,
    marginTop: 50,
  },
  card: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    margin: 7,
  },
  text: {
    fontFamily: fonts.primary.medium,
    fontSize: 18,
    flex: 1,
    flexWrap: "wrap",
    color: Colors.light.text,
  },
});
