import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Colors, fonts } from "@/constants";
import {
  BusinessItem,
  CategoryHome,
  FullLoading,
  Gap,
  SearchBar,
  Title,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  getBusinessByCategory,
  getCategory,
  resetSelectedCategory,
} from "@/store/reducers/categorySlice";
import { useRouter } from "expo-router";

export default function Explore() {
  const { categories }: any = useSelector((state: RootState) => state.category);
  const { businessCategory, loading }: any = useSelector(
    (state: RootState) => state.category,
  );

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(resetSelectedCategory());
  }, [dispatch]);

  const onGetBusinessCategory = (item: any) => {
    //Jika ada ID nya ,
    //dan jika id yang sekarang tidak sama dengan id yang sudah di select (agar tidak refetch terus2an ke database)
    if (item?.id && businessCategory?.id !== item?.id) {
      dispatch(getBusinessByCategory(item?.id));
    }
  };

  return (
    <>
      <View style={styles.pages}>
        <View style={{ paddingHorizontal: 20 }}>
          <Title title="Explore More" fontSize={24} fontWeight="bold" />
        </View>
        {/* Searchbar */}
        <View style={{ paddingHorizontal: 20 }}>
          <SearchBar />
        </View>
        {/* Category */}
        <Gap height={10} />
        <View>
          <CategoryHome
            category={categories}
            explore={true}
            onCategorySelect={(selectedCategory) =>
              onGetBusinessCategory(selectedCategory)
            }
          />
        </View>
        {/* Business Detail */}

        <FlatList
          data={businessCategory?.businesses}
          renderItem={({ item, index }) => (
            <BusinessItem
              item={item}
              styleItem="row"
              onPress={() => router.push(`business_detail/${item.id}`)}
            />
          )}
          refreshing={loading}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.text}>No Business Found!</Text>
            </View>
          }
        />
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
  },
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
