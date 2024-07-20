import { FlatList, StyleSheet } from "react-native";
import React from "react";
import CategoryItem from "../CategoryItem";
import { useRouter } from "expo-router";

interface Props {
  category: any[];
  explore?: boolean;
  onCategorySelect?: (e: any) => void;
}

export default function CategoryHome({
  category,
  explore = false,
  onCategorySelect,
}: Props) {
  const router = useRouter();

  const onSelectCategory = (item: any) => {
    if (!explore) {
      router.push({
        pathname: `/business/${item.id}`,
        params: item,
      });
    } else {
      if (onCategorySelect) {
        onCategorySelect(item);
      }
    }
  };
  return (
    <>
      <FlatList
        data={category}
        horizontal={true}
        contentContainerStyle={styles.categoryContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            onPress={() => onSelectCategory(item)}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
  },
});
