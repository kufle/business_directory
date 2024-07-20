import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const selectCategories = (state: RootState) => state.category;

export const selectCategoryOptions = createSelector(
  [selectCategories],
  (categories) =>
    categories.map((category: any) => ({
      label: category.name,
      value: category.id,
    })),
);
