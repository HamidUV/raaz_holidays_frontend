
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export interface HajjUmrahPackage {
  id: string;
  title: string;
  description: string;
  price: string;
  start_date: string;
  end_date: string;
  location: string;
  contact_number: string;
  image_url: string;
  created_at: string;
}

export const useHajjUmrahPackages = () => {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ['packages', 'hajj-umrah'],
    queryFn: () => apiClient.getHajjUmrahPackages(),
  });

  // Ensure packages is always an array, regardless of API response structure
  const packages = Array.isArray(data) ? data : (data && typeof data === 'object' && 'packages' in data && Array.isArray((data as any).packages) ? (data as any).packages : []);

  return {
    packages,
    isLoading,
    error,
  };
};
