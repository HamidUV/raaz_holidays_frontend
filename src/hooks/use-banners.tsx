
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, Banner } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const useBanners = () => {
  const {
    data: banners = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['banners'],
    queryFn: () => apiClient.getBanners(),
  });

  // Ensure banners is always an array
  const safeBanners = Array.isArray(banners) ? banners : [];

  // Filter active banners and sort by display order
  const activeBanners = safeBanners
    .filter((banner: Banner) => banner.active !== false)
    .sort((a: Banner, b: Banner) => a.display_order - b.display_order);

  return {
    banners: safeBanners,
    activeBanners,
    isLoading,
    error,
  };
};

export const useAdminBanners = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: banners = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['admin', 'banners'],
    queryFn: () => apiClient.getAdminBanners(),
    retry: (failureCount, error) => {
      // Don't retry on auth errors
      if (error.message.includes('Authentication failed')) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // Ensure banners is always an array
  const safeBanners = Array.isArray(banners) ? banners : [];

  // Filter active banners and sort by display order
  const activeBanners = safeBanners
    .filter((banner: Banner) => banner.active !== false)
    .sort((a: Banner, b: Banner) => a.display_order - b.display_order);

  // Create banner mutation
  const createBanner = useMutation({
    mutationFn: async (bannerData: { formData: FormData } & Banner) => {
      return apiClient.addBanner(bannerData.formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'banners'] });
      toast({
        title: "Banner created",
        description: "Banner has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create banner.",
        variant: "destructive",
      });
    },
  });

  // Update banner mutation
  const updateBanner = useMutation({
    mutationFn: async (bannerData: { formData: FormData } & Banner) => {
      return apiClient.updateBanner(bannerData.id!, bannerData.formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'banners'] });
      toast({
        title: "Banner updated",
        description: "Banner has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update banner.",
        variant: "destructive",
      });
    },
  });

  // Delete banner mutation
  const deleteBanner = useMutation({
    mutationFn: (id: string) => apiClient.deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'banners'] });
      toast({
        title: "Banner deleted",
        description: "Banner has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete banner.",
        variant: "destructive",
      });
    },
  });

  return {
    banners: safeBanners,
    activeBanners,
    isLoading,
    error,
    refetch,
    createBanner,
    updateBanner,
    deleteBanner,
  };
};
