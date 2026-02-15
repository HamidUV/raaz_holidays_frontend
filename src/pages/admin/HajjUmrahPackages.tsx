
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { apiClient } from '@/lib/api';

interface HajjUmrahPackage {
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

const HajjUmrahPackages: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: packagesData, isLoading, error } = useQuery({
    queryKey: ['admin', 'hajj-umrah-packages'],
    queryFn: () => apiClient.getAdminHajjUmrahPackages(),
  });

  // Ensure packages is always an array
  const packages = Array.isArray(packagesData) ? packagesData : [];

  const deletePackage = useMutation({
    mutationFn: (id: string) => apiClient.deleteHajjUmrahPackage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'hajj-umrah-packages'] });
      queryClient.invalidateQueries({ queryKey: ['packages', 'hajj-umrah'] });
      toast({
        title: 'Package Deleted',
        description: 'Hajj & Umrah package has been deleted successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete package.',
        variant: 'destructive',
      });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      deletePackage.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <p>Loading Hajj & Umrah packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Failed to load Hajj & Umrah packages. Please make sure your backend server is running.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hajj & Umrah Packages</h1>
        <Button 
          onClick={() => navigate('/raaz_admin/hajj-umrah/add')}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add New Package
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {packages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No Hajj & Umrah packages found</p>
              <Button onClick={() => navigate('/raaz_admin/hajj-umrah/add')}>
                Create Your First Package
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Package Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg: HajjUmrahPackage) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      <img
                        src={pkg.image_url}
                        alt={pkg.title}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{pkg.title}</TableCell>
                    <TableCell>₹{pkg.price}</TableCell>
                    <TableCell>{format(new Date(pkg.start_date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{format(new Date(pkg.end_date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/raaz_admin/hajj-umrah/edit/${pkg.id}`)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(pkg.id)}
                          disabled={deletePackage.isPending}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HajjUmrahPackages;
