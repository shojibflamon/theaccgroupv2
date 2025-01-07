"use client";

import {
  changePassword,
  deleteUser,
  getUser,
  getUserByID,
  postUser,
  updateUser,
} from "@/views/userViews";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGETUser = (parm = {}) => {
  return useQuery({
    queryKey: ["user", parm],
    queryFn: async () => {
      const _ = await getUser(parm);
      return _;
    },
  });
};

export const usePostUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => await postUser(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
};

export const useUpdateUser = (id) => {
  // console.log(id,'user')
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await updateUser({ ...body, ...{ id: id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
};

export const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await changePassword(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
};

export const useDeleteUser = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
};

export const useGETProfileData = () => {
  return useQuery({
    queryKey: ["user_profile"],
    queryFn: async () => {
      const _ = await getUserByID();
      return _;
    },
  });
};
