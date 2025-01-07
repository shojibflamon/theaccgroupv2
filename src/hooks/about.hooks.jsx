"use client";
import {
  getAboutHeroSection,
  getAboutPromoSection,
  uploadAboutHeroSection,
  uploadAboutPromoSection,
} from "@/views/aboutView";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGETLAboutSection = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const _ = await getAboutHeroSection();
      return _;
    },
  });
};

export const useGETPromoData = () => {
  return useQuery({
    queryKey: ["promo"],
    queryFn: async () => {
      const _ = await getAboutPromoSection();
      return _;
    },
  });
};

export const usePostLAboutSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await uploadAboutHeroSection(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["about"] }),
  });
};

export const usePostLPromoData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await uploadAboutPromoSection(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["promo"] }),
  });
};
