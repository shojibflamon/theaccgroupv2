"use client";

import { getPermission } from "@/views/permissionView";
import {
  deleteRole,
  getRole,
  getRoleByID,
  postRole,
  updateRole,
} from "@/views/roleView";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGETRole = (parm = {}) => {
  return useQuery({
    queryKey: ["role", parm],
    queryFn: async () => await getRole(parm),
  });
};

export const useGETRoleByID = (id) => {
  return useQuery({
    queryKey: ["role_id", id],
    queryFn: async () => await getRoleByID(id),
    enabled: Boolean(id),
  });
};

export const usePostRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await postRole(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["role"] }),
  });
};

export const useUpdateRole = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await updateRole({ ...body, ...{ id: id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["role"] }),
  });
};

export const useDeleteRole = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteRole(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["role"] }),
  });
};

// permission
export const useGETPermjisssion = () => {
  return useQuery({
    queryKey: ["permission"],
    queryFn: async () => await getPermission(),
  });
};
