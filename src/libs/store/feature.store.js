import { create } from "zustand";

export const FeaturedProductsStore = create((set) => ({
  feateredProducts: [],
  setFeatureProduct: (data) =>
    set({
      feateredProducts: data,
    }),
}));
