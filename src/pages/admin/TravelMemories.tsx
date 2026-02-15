

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

interface TravelMemory {
  id: string;
  image_url: string;
  caption?: string;
  created_at: string;
}

const memorySchema = z.object({
  caption: z.string().optional(),
});

type MemoryForm = z.infer<typeof memorySchema>;

const TravelMemories: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<MemoryForm>({
    resolver: zodResolver(memorySchema),
    defaultValues: {
      caption: '',
    },
  });

  const { data: memories = [], isLoading, error } = useQuery({
    queryKey: ['admin', 'travel-memories'],
    queryFn: () => apiClient.getAdminTravelMemories(),
  });

  const addMemory = useMutation({
    mutationFn: (memoryData: FormData) => apiClient.addTravelMemory(memoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'travel-memories'] });
      queryClient.invalidateQueries({ queryKey: ['travel-memories'] });
      toast({
        title: 'Memory Added',
        description: 'Travel memory has been added successfully.',
      });
      form.reset();
      setImageFile(null);
      setImagePreview(null);
      setShowAddForm(false);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add travel memory.',
        variant: 'destructive',
      });
    },
  });

  const deleteMemory = useMutation({
    mutationFn: (id: string) => apiClient.deleteTravelMemory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'travel-memories'] });
      queryClient.invalidateQueries({ queryKey: ['travel-memories'] });
      toast({
        title: 'Memory Deleted',
        description: 'Travel memory has been deleted successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete travel memory.',
        variant: 'destructive',
      });
    },
  });

  const handleImageFileChange = (file: File) => {
    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFileChange(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      deleteMemory.mutate(id);
    }
  };

  const onSubmit = async (data: MemoryForm) => {
    if (!imageFile) {
      toast({
        title: 'Image Required',
        description: 'Please upload an image for the memory.',
        variant: 'destructive',
      });
      return;
    }

    // Check if we already have 8 or more memories
    if (memories.length >= 8) {
      toast({
        title: 'Memory Limit Reached',
        description: 'You can have a maximum of 8 travel memories. Please delete some existing memories before adding new ones.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      if (data.caption) {
        formData.append('caption', data.caption);
      }
      formData.append('image', imageFile);

      await addMemory.mutateAsync(formData);
    } catch (error) {
      // Error handled by mutation
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <p>Loading travel memories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Failed to load travel memories</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-screen flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold">Travel Memories</h1>
          <p className="text-gray-600 mt-2">
            Manage travel memories ({memories.length}/8 used)
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
          disabled={memories.length >= 8}
        >
          <Plus size={16} />
          {memories.length >= 8 ? 'Memory Limit Reached' : 'Add New Memory'}
        </Button>
      </div>

      {memories.length >= 8 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex-shrink-0">
          <p className="text-yellow-800">
            <strong>Memory limit reached:</strong> You have reached the maximum of 8 travel memories. 
            To add new memories, please delete some existing ones first.
          </p>
        </div>
      )}

      {/* Add New Memory Form */}
      {showAddForm && memories.length < 8 && (
        <Card className="mb-6 flex-shrink-0">
          <CardHeader>
            <CardTitle>Add New Travel Memory</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caption (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter a caption for this memory" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Enhanced Image Upload Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Memory Image <span className="text-red-500">*</span>
                  </label>
                  
                  {!imagePreview ? (
                    <div 
                      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                        dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('memory-file-input')?.click()}
                    >
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <div className="space-y-2">
                        <p className="text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                      <input
                        id="memory-file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Selected Image:</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={removeImage}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-20 w-20 object-cover rounded border"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">{imageFile?.name}</p>
                          <p className="text-xs text-gray-500">
                            {imageFile && (imageFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowAddForm(false);
                      setImageFile(null);
                      setImagePreview(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Memory'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Memories Table with Controlled Scrolling */}
      <Card className="flex-1 flex flex-col min-h-0">
        <CardContent className="pt-6 px-6 pb-0 flex flex-col h-full">
          {memories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No travel memories found</p>
              <Button onClick={() => setShowAddForm(true)}>
                Create Your First Memory
              </Button>
            </div>
          ) : (
            <div className="overflow-auto flex-1">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10 border-b shadow-sm">
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Caption</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memories.map((memory: TravelMemory) => (
                    <TableRow key={memory.id}>
                      <TableCell>
                        <img
                          src={memory.image_url}
                          alt={memory.caption || 'Travel memory'}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {memory.caption || 'No caption'}
                      </TableCell>
                      <TableCell>
                        {format(new Date(memory.created_at), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(memory.id)}
                          disabled={deleteMemory.isPending}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelMemories;

