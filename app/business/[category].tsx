import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getBusinessByCategory } from "@/store/reducers/categorySlice";
import { BusinessItem, Loading } from "@/components";
import { Colors, fonts } from "@/constants";

export default function BusinessByCategory() {
  const navigation = useNavigation();
  const { category, name } = useLocalSearchParams();
  const { businessCategory, loading }: any = useSelector(
    (state: RootState) => state.category,
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const listBusinessCategory = useCallback(() => {
    dispatch(getBusinessByCategory(category));
  }, [category, dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: name,
    });

    listBusinessCategory();
  }, [listBusinessCategory, name, navigation]);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={businessCategory?.businesses}
          renderItem={({ item, index }) => (
            <BusinessItem
              item={item}
              styleItem="row"
              onPress={() => router.push(`business_detail/${item.id}`)}
            />
          )}
          onRefresh={listBusinessCategory}
          refreshing={loading}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.text}>No Business Found!</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.primary.medium,
    color: Colors.light.text,
  },
});
