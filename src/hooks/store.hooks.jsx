"use client";

import {
  deleteStore,
  getStore,
  postStore,
  updateStore,
} from "@/views/storeView";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGETStore = (parm = {}) => {
  return useQuery({
    queryKey: ["store", parm],
    queryFn: async () => {
      const _ = await getStore(parm);
      return _;
    },
  });
};

export const usePostStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await postStore(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["store"] }),
  });
};

export const useUpdateStore = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await updateStore({ ...body, ...{ id: id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["store"] }),
  });
};

export const useDeleteStore = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteStore(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["store"] }),
  });
};
