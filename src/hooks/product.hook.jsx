"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProductCategory,
  getProductCategory,
  postProductCategory,
  updateProductCategory,
} from "../views/productCategoryView";
import {
  deleteProduct,
  getFeatureProduct,
  getProduct,
  postFeatureProduct,
  postProduct,
  updateProduct,
} from "@/views/productView";

export const useGETProductCategory = (parm = {}) => {
  return useQuery({
    queryKey: ["product_category", parm],
    queryFn: async () => {
      const _ = await getProductCategory(parm);
      return _;
    },
  });
};

export const usePostProductCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await postProductCategory(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product_category"] }),
  });
};

export const useUpdateProductCategory = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) =>
      await updateProductCategory({ ...body, ...{ id: id } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product_category"] }),
  });
};

export const useDeleteProductCategory = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteProductCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product_category"] }),
  });
};

/**
 *
 *  Product
 */

export const useGetProduct = (parm = {}) => {
  return useQuery({
    queryKey: ["product", parm],
    queryFn: async () => {
      const _ = await getProduct(parm);
      return _;
    },
  });
};

export const usePostProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => await postProduct(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["product"] }),
  });
};

export const useUpdateProduct = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => await updateProduct({ ...body, ...{ id: id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["product"] }),
  });
};

export const useDeleteProduct = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["product"] }),
  });
};

/**
 *
 * Feature Product
 *
 */

export const useGETFeaturedProduct = () => {
  return useQuery({
    queryKey: ["feature_product"],
    queryFn: async () => {
      const _ = await getFeatureProduct();
      return _;
    },
  });
};

export const usePostFeaturedProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => await postFeatureProduct(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['product'] }),
  });
};
