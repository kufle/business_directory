import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getBusinessById } from "@/store/reducers/businessSlice";
import Intro from "@/components/molecules/BusinessDetail/Intro";
import { FullLoading } from "@/components";
import ActionButton from "@/components/molecules/BusinessDetail/ActionButton";
import TitleIntro from "@/components/molecules/BusinessDetail/TitleIntro";
import { Colors } from "@/constants";
import AboutBusiness from "@/components/molecules/BusinessDetail/AboutBusiness";
import Review from "@/components/molecules/BusinessDetail/Review";
import Comment from "@/components/molecules/BusinessDetail/Comment";

export default function BusinessDetail() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { business_detail, loading }: any = useSelector(
    (state: RootState) => state.business,
  );
  const router = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(getBusinessById(id));
    }
  }, [dispatch, id]);

  //console.log(business_detail);
  return (
    <>
      {business_detail && (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Intro  */}
          <Intro image={business_detail.image} onPress={() => router.back()} />
          {/* Title Intro */}
          <View style={styles.container}>
            <TitleIntro
              name={business_detail.name}
              address={business_detail.address}
            />
            {/* Action */}
            <ActionButton business={business_detail} />
            {/* About */}
            <AboutBusiness about={business_detail.about} />
            {/* Review */}
            <Review id={business_detail.id} />
            {/* Comments */}
            <Comment comment_rating={business_detail.ratings} />
          </View>
        </ScrollView>
      )}
      {loading && <FullLoading />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    marginTop: -20,
    flex: 1,
  },
});
