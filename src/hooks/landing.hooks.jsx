import { getLandingImages, manageHeroImageView } from "@/views/hero";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGETLandingHeroSection = () => {
  return useQuery({
    queryKey: ["landing"],
    queryFn: async () => {
      const _ = await getLandingImages();
      return _;
    },
  });
};

export const usePostLandingHeroSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => await manageHeroImageView(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product_category"] }),
  });
};
