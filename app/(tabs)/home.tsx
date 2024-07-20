import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import {
  CategoryHome,
  Gap,
  HeaderHome,
  PopularBusiness,
  SliderHome,
  Title,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  getCategory,
  getPopularBusiness,
  getSlider,
} from "@/store/reducers/homeSlice";
import { Colors } from "@/constants";

export default function Home() {
  const { sliders, categories, business }: any = useSelector(
    (state: RootState) => state.home,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSlider());
    dispatch(getCategory());
    dispatch(getPopularBusiness());
  }, [dispatch]);

  return (
    <ScrollView style={styles.pages}>
      {/* HEADER */}
      <HeaderHome />
      {/* Slider */}
      <View style={styles.titleWrapper}>
        <Title title="#Special for you" fontSize={18} fontWeight="medium" />
      </View>
      <SliderHome slider={sliders} />
      {/* Category */}
      <View style={styles.titleWrapper}>
        <Title
          title="Category"
          fontSize={18}
          fontWeight="medium"
          onPress={() => {}}
        />
      </View>
      <CategoryHome category={categories} />
      {/* Popular */}
      <View style={styles.titleWrapper}>
        <Title
          title="Popular Business"
          fontSize={18}
          fontWeight="medium"
          onPress={() => {}}
        />
      </View>
      <PopularBusiness business={business} />
      <Gap height={20} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pages: {
    backgroundColor: Colors.white,
  },
  titleWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
