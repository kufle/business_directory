import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Colors, fonts } from "@/constants";
import SearchBar from "../SearchBar";

export default function HeaderHome() {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const currentUser = GoogleSignin.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <View style={styles.pages}>
      <View style={styles.wrapper}>
        {user.user?.photo && (
          <Image source={{ uri: user.user?.photo }} style={styles.photo} />
        )}
        <View>
          <Text style={styles.textWelcome}>Welcome,</Text>
          <Text style={styles.textUser}>{user.user?.name}</Text>
        </View>
      </View>
      {/* Search Bar */}
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  pages: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  photo: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  textWelcome: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: Colors.white,
  },
  textUser: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
    color: Colors.white,
  },
  textInput: {
    color: Colors.light.text,
    fontFamily: fonts.primary.regular,
    fontSize: 16,
    padding: 10,
    backgroundColor: Colors.white,
    flex: 1,
  },
  search_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 8,
  },
});
