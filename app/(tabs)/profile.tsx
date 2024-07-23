import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants";
import { FullLoading, Title } from "@/components";
import UserIntro from "@/components/molecules/Profile/UserIntro";
import { storageGetData } from "@/utils";
import MenuList from "@/components/molecules/Profile/MenuList";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    storageGetData("user").then((res) => setUser(res));
  }, []);

  return (
    <>
      <View style={styles.pages}>
        <Title title="Profile" fontSize={24} fontWeight="bold" />
        {/* User Intro */}
        <UserIntro user={user} />
        {/* Menu */}
        <MenuList />
      </View>
      {loading && <FullLoading />}
    </>
  );
}

const styles = StyleSheet.create({
  pages: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});
