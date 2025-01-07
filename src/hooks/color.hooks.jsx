"use client";
import {
  deleteColor,
  getColors,
  postColor,
  updateColor,
} from "@/views/colorView";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGETColor = (parm = {}) => {
  return useQuery({
    queryKey: ["color", parm],
    queryFn: async () => {
      const _ = await getColors(parm);
      return _;
    },
  });
};

export const usePostColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await postColor(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["color"] }),
  });
};

export const useUpdateColor = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await updateColor({ ...body, ...{ id: id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["color"] }),
  });
};

export const useDeleteColor = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteColor(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["color"] }),
  });
};
