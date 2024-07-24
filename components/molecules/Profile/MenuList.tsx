import {
  Alert,
  Dimensions,
  FlatList,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import IAddBusiness from "@/assets/images/add_building.svg";
import IInfoBusiness from "@/assets/images/info_building.svg";
import IShare from "@/assets/images/share_link.svg";
import IPower from "@/assets/images/power.svg";
import { Colors, fonts } from "@/constants";
import { useNavigation, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { logoutUser } from "@/store/reducers/authSlice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { CommonActions } from "@react-navigation/native";
import { configureGoogleSignIn } from "@/config";

const { width } = Dimensions.get("window");
const iconsize = width * 0.11;

export default function MenuList() {
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    configureGoogleSignIn();
  });

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
      path: "/business/MyBusiness",
    },
    {
      id: 3,
      name: "Share App",
      icon: <IShare width={iconsize} height={iconsize} />,
      path: "share",
    },
    {
      id: 4,
      name: "Logout",
      icon: <IPower width={iconsize} height={iconsize} />,
      path: "logout",
    },
  ];

  const onMenuClick = (item: any) => {
    if (item.path === "logout") {
      Alert.alert("Do you want logout ?", "Are you sure want Logout ?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => logout(),
        },
      ]);
      return;
    }

    if (item.path === "share") {
      Share.share({
        message: "Download This app",
      });
      return;
    }

    router.push(item.path);
  };

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      await dispatch(logoutUser()).unwrap();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "index" }],
        }),
      );
    } catch (error: any) {
      console.log(error);
    }
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
