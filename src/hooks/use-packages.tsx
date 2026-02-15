
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, Package } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const usePackages = () => {
  const {
    data: exclusivePackages = [],
    isLoading: exclusiveLoading,
    error: exclusiveError
  } = useQuery({
    queryKey: ['packages', 'exclusive'],
    queryFn: () => apiClient.getExclusivePackages(),
  });

  const {
    data: upcomingPackages = [],
    isLoading: upcomingLoading,
    error: upcomingError
  } = useQuery({
    queryKey: ['packages', 'upcoming'],
    queryFn: () => apiClient.getUpcomingPackages(),
  });

  return {
    exclusivePackages: Array.isArray(exclusivePackages) ? exclusivePackages : [],
    upcomingPackages: Array.isArray(upcomingPackages) ? upcomingPackages : [],
    isLoading: exclusiveLoading || upcomingLoading,
    error: exclusiveError || upcomingError,
  };
};

export const useAdminPackages = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: exclusiveData,
    isLoading: exclusiveLoading,
    error: exclusiveError
  } = useQuery({
    queryKey: ['admin', 'packages', 'exclusive'],
    queryFn: () => apiClient.getAdminExclusivePackages(),
    retry: (failureCount, error) => {
      if (error.message.includes('Authentication failed')) {
        return false;
      }
      return failureCount < 3;
    },
  });

  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    error: upcomingError
  } = useQuery({
    queryKey: ['admin', 'packages', 'upcoming'],
    queryFn: () => apiClient.getAdminUpcomingPackages(),
    retry: (failureCount, error) => {
      if (error.message.includes('Authentication failed')) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // Handle API response data correctly - check for different response structures
  const exclusivePackages = Array.isArray(exclusiveData) ? exclusiveData : 
                            (exclusiveData && typeof exclusiveData === 'object' && exclusiveData !== null && 'packages' in exclusiveData && Array.isArray((exclusiveData as any).packages)) ? (exclusiveData as any).packages : [];
  const upcomingPackages = Array.isArray(upcomingData) ? upcomingData : 
                          (upcomingData && typeof upcomingData === 'object' && upcomingData !== null && 'packages' in upcomingData && Array.isArray((upcomingData as any).packages)) ? (upcomingData as any).packages : [];
  
  const packages = [...exclusivePackages, ...upcomingPackages];

  // Create package mutation
  const createPackage = useMutation({
    mutationFn: async (packageData: Package & { imageFile?: File }) => {
      const formData = new FormData();
      
      // Add all package fields except id and imageFile
      Object.entries(packageData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'id' && key !== 'imageFile') {
          if (key === 'tour_dates' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Add image file if provided
      if (packageData.imageFile) {
        formData.append('image', packageData.imageFile);
      }

      if (packageData.type === 'exclusive') {
        return apiClient.addExclusivePackage(formData);
      } else {
        return apiClient.addUpcomingPackage(formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'packages'] });
      toast({
        title: "Package created",
        description: "Package has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create package.",
        variant: "destructive",
      });
    },
  });

  // Update package mutation
  const updatePackage = useMutation({
    mutationFn: async (packageData: Package & { imageFile?: File }) => {
      const formData = new FormData();
      
      // Add all package fields except id and imageFile
      Object.entries(packageData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'id' && key !== 'imageFile') {
          if (key === 'tour_dates' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Add image file if provided (for updates)
      if (packageData.imageFile) {
        formData.append('image', packageData.imageFile);
      }

      if (packageData.type === 'exclusive') {
        return apiClient.updateExclusivePackage(packageData.id!, formData);
      } else {
        return apiClient.updateUpcomingPackage(packageData.id!, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'packages'] });
      toast({
        title: "Package updated",
        description: "Package has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update package.",
        variant: "destructive",
      });
    },
  });

  // Delete package mutation
  const deletePackage = useMutation({
    mutationFn: async (id: string) => {
      // Find the package to determine its type
      const pkg = packages.find(p => p.id === id);
      if (!pkg) throw new Error('Package not found');

      if (pkg.type === 'exclusive') {
        return apiClient.deleteExclusivePackage(id);
      } else {
        return apiClient.deleteUpcomingPackage(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'packages'] });
      toast({
        title: "Package deleted",
        description: "Package has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete package.",
        variant: "destructive",
      });
    },
  });

  // Image upload function
  const uploadImage = async (file: File): Promise<string> => {
    // For now, return a placeholder URL
    // In a real implementation, you would upload to your backend
    return URL.createObjectURL(file);
  };

  return {
    packages,
    exclusivePackages,
    upcomingPackages,
    isLoading: exclusiveLoading || upcomingLoading,
    error: exclusiveError || upcomingError,
    createPackage,
    updatePackage,
    deletePackage,
    uploadImage,
  };
};
