
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export interface TravelMemory {
  id: string;
  image_url: string;
  caption?: string;
  created_at: string;
}

export const useTravelMemories = () => {
  const {
    data: memories = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['travel-memories'],
    queryFn: () => apiClient.getTravelMemories(),
  });

  return {
    memories: Array.isArray(memories) ? memories : [],
    isLoading,
    error,
  };
};
