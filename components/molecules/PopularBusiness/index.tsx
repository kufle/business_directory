import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import BusinessItem from "../BusinessItem";
import { useRouter } from "expo-router";

interface Props {
  business: any[];
}

export default function PopularBusiness({ business }: Props) {
  const router = useRouter();
  return (
    <View>
      <FlatList
        data={business}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.businessContainer}
        renderItem={({ item, index }) => (
          <BusinessItem
            item={item}
            onPress={() => router.push(`business_detail/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  businessContainer: {
    padding: 10,
  },
});
