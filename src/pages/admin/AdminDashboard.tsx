import React, { useState, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Package, Calendar, Image, Edit, Trash2, Upload, MapPin, Camera } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useAdminPackages } from '@/hooks/use-packages';
import { useAdminBanners } from '@/hooks/use-banners';
import { useHajjUmrahPackages } from '@/hooks/use-hajj-umrah-packages';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Banner, Package as PackageType } from '@/lib/api';

interface AdminDashboardProps {
  section?: 'packages' | 'upcoming' | 'banners';
}

interface FormData {
  title: string;
  description: string;
  price: string;
  image_url: string;
  duration?: string;
  location: string;
  contact_number: string;
  early_bird?: boolean;
  slots_available?: number;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
  caption?: string;
  link?: string;
  display_order?: number;
  active?: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ section }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<boolean>(false);
  const { toast } = useToast();
  
  const { 
    packages, 
    exclusivePackages, 
    upcomingPackages, 
    isLoading: packagesLoading,
    createPackage, 
    updatePackage, 
    deletePackage,
    uploadImage
  } = useAdminPackages();
  
  const {
    banners,
    isLoading: bannersLoading,
    createBanner,
    updateBanner,
    deleteBanner
  } = useAdminBanners();

  const { 
    packages: hajjUmrahPackages, 
    isLoading: hajjUmrahLoading 
  } = useHajjUmrahPackages();
  
  // Use admin-specific query for travel memories to get all memories
  const { 
    data: memories = [], 
    isLoading: memoriesLoading 
  } = useQuery({
    queryKey: ['admin', 'travel-memories'],
    queryFn: () => apiClient.getAdminTravelMemories(),
  });

  const form = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      image_url: '',
      duration: '',
      location: '',
      contact_number: '',
      early_bird: false,
      slots_available: undefined,
      featured: false,
      startDate: '',
      endDate: '',
      caption: '',
      link: '',
      display_order: 0,
      active: true
    },
  });
  
  const handleAddNew = () => {
    setFormMode('add');
    form.reset();
    setCurrentItemId(null);
    setUploadedFile(null);
    setIsFormOpen(true);
  };
  
  const handleEdit = (id: string) => {
    setFormMode('edit');
    setCurrentItemId(id);
    setUploadedFile(null);
    
    // Find the item to edit based on current section
    let itemToEdit;
    if (section === 'packages') {
      itemToEdit = exclusivePackages.find(pkg => pkg.id === id);
    } else if (section === 'upcoming') {
      itemToEdit = upcomingPackages.find(pkg => pkg.id === id);
      
      // For upcoming packages, get the first tour date if available
      if (itemToEdit && itemToEdit.tour_dates && itemToEdit.tour_dates.length > 0) {
        const firstDate = itemToEdit.tour_dates[0];
        form.setValue('startDate', firstDate.startDate);
        form.setValue('endDate', firstDate.endDate);
      }
    } else if (section === 'banners') {
      itemToEdit = banners.find(banner => banner.id === id);
    }
    
    if (itemToEdit) {
      // Reset form with the found item
      Object.keys(itemToEdit).forEach((key) => {
        // Typescript needs this check
        if (key in form.getValues() && key !== 'tour_dates') {
          form.setValue(key as any, itemToEdit[key as keyof typeof itemToEdit]);
        }
      });
    }
    
    setIsFormOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (section === 'packages' || section === 'upcoming') {
        deletePackage.mutate(id);
      } else if (section === 'banners') {
        deleteBanner.mutate(id);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      // Auto-generate a preview URL for the uploaded file
      const previewUrl = URL.createObjectURL(files[0]);
      form.setValue('image_url', previewUrl);
    }
  };

  const handleFileUpload = async () => {
    if (!uploadedFile) return;

    setUploadProgress(true);
    try {
      const imageUrl = await uploadImage(uploadedFile);
      form.setValue('image_url', imageUrl);
      toast({
        title: "Image uploaded",
        description: "Image has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the image.",
        variant: "destructive"
      });
    } finally {
      setUploadProgress(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const onSubmit = async (data: FormData) => {
    try {
      if (section === 'packages') {
        const packageData: PackageType & { imageFile?: File } = {
          id: currentItemId || undefined,
          title: data.title,
          description: data.description,
          type: 'exclusive',
          price: data.price,
          image_url: data.image_url,
          duration: data.duration,
          location: data.location,
          contact_number: data.contact_number,
          featured: data.featured,
          early_bird: data.early_bird,
          imageFile: uploadedFile || undefined
        };
        
        if (formMode === 'add') {
          createPackage.mutate(packageData);
        } else {
          updatePackage.mutate(packageData);
        }
      } else if (section === 'upcoming') {
        const tourDate = data.startDate && data.endDate ? 
          [{ startDate: data.startDate, endDate: data.endDate }] : [];
        
        const packageData: PackageType & { imageFile?: File } = {
          id: currentItemId || undefined,
          title: data.title,
          description: data.description,
          type: 'upcoming',
          price: data.price,
          image_url: data.image_url,
          location: data.location,
          contact_number: data.contact_number,
          tour_dates: tourDate,
          early_bird: data.early_bird,
          slots_available: data.slots_available,
          imageFile: uploadedFile || undefined
        };
        
        if (formMode === 'add') {
          createPackage.mutate(packageData);
        } else {
          updatePackage.mutate(packageData);
        }
      } else if (section === 'banners') {
        // Create FormData for banner
        const formData = new FormData();
        
        // Add image file if selected
        if (uploadedFile) {
          formData.append('image', uploadedFile);
        }
        
        // Add other form fields
        if (data.caption) formData.append('caption', data.caption);
        if (data.link) formData.append('link', data.link);
        formData.append('display_order', (data.display_order || 0).toString());
        formData.append('active', (data.active !== false).toString());

        const bannerData: Banner = {
          id: currentItemId || undefined,
          image_url: data.image_url,
          caption: data.caption,
          link: data.link,
          display_order: data.display_order || 0,
          active: data.active
        };
        
        if (formMode === 'add') {
          createBanner.mutate({ ...bannerData, formData });
        } else {
          updateBanner.mutate({ ...bannerData, formData });
        }
      }
      
      setIsFormOpen(false);
      setUploadedFile(null);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  
  const renderDashboardOverview = () => (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Exclusive Packages
            </CardTitle>
            <Package className="h-4 w-4 text-raaz" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exclusivePackages?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Actively listed packages
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Packages
            </CardTitle>
            <Calendar className="h-4 w-4 text-raaz" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingPackages?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Future tour packages
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hajj & Umrah
            </CardTitle>
            <MapPin className="h-4 w-4 text-raaz" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hajjUmrahPackages?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Religious packages
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Travel Memories
            </CardTitle>
            <Camera className="h-4 w-4 text-raaz" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memories?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Photo memories ({memories?.length || 0}/8)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Banners
            </CardTitle>
            <Image className="h-4 w-4 text-raaz" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Active homepage banners
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest changes to website content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {packages && packages.length > 0 ? packages.slice(0, 2).map((pkg, index) => (
                <div key={pkg.id} className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <Package className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{pkg.type === 'exclusive' ? 'Exclusive' : 'Upcoming'} package</p>
                    <p className="text-xs text-gray-500">{pkg.title}</p>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">
                    {new Date(pkg.created_at || '').toLocaleDateString()}
                  </div>
                </div>
              )) : null}
              
              {hajjUmrahPackages && hajjUmrahPackages.length > 0 ? hajjUmrahPackages.slice(0, 2).map((pkg) => (
                <div key={pkg.id} className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2">
                    <MapPin className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Hajj & Umrah package</p>
                    <p className="text-xs text-gray-500">{pkg.title}</p>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">
                    {new Date(pkg.created_at || '').toLocaleDateString()}
                  </div>
                </div>
              )) : null}
              
              {memories && memories.length > 0 ? memories.slice(0, 2).map((memory) => (
                <div key={memory.id} className="flex items-center">
                  <div className="mr-4 rounded-full bg-orange-100 p-2">
                    <Camera className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Travel Memory</p>
                    <p className="text-xs text-gray-500">{memory.caption || 'Photo memory'}</p>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">
                    {new Date(memory.created_at || '').toLocaleDateString()}
                  </div>
                </div>
              )) : null}
              
              {banners && banners.length > 0 ? banners.slice(0, 1).map((banner) => (
                <div key={banner.id} className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <Image className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Banner</p>
                    <p className="text-xs text-gray-500">{banner.caption || 'Banner image'}</p>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">
                    {new Date(banner.created_at || '').toLocaleDateString()}
                  </div>
                </div>
              )) : null}
              
              {(!packages || packages.length === 0) && 
               (!hajjUmrahPackages || hajjUmrahPackages.length === 0) && 
               (!memories || memories.length === 0) && 
               (!banners || banners.length === 0) && (
                <p className="text-sm text-gray-500">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
  
  const renderExclusivePackages = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-deepblue">Exclusive Packages</h2>
        <Button onClick={handleAddNew} className="bg-deepblue hover:bg-deepblue-light">
          Add New Package
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Package Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packagesLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">Loading packages...</TableCell>
                </TableRow>
              ) : exclusivePackages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No exclusive packages found.</TableCell>
                </TableRow>
              ) : (
                exclusivePackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      {pkg.image_url ? (
                        <div className="h-12 w-16 overflow-hidden rounded-md">
                          <img 
                            src={pkg.image_url} 
                            alt={pkg.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-16 bg-gray-100 flex items-center justify-center rounded-md">
                          <Image className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{pkg.title}</TableCell>
                    <TableCell>{pkg.price}</TableCell>
                    <TableCell>{pkg.duration}</TableCell>
                    <TableCell>{pkg.location}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(pkg.id!)}
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(pkg.id!)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{formMode === 'add' ? 'Add New Package' : 'Edit Package'}</SheetTitle>
            <SheetDescription>
              Fill in the details to {formMode === 'add' ? 'create a new' : 'update the'} package.
            </SheetDescription>
          </SheetHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <FormLabel>Package Image *</FormLabel>
                {form.watch('image_url') && (
                  <div className="h-48 w-full overflow-hidden rounded-md mb-2">
                    <img 
                      src={form.watch('image_url')} 
                      alt="Package preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex gap-2 items-end">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    ref={fileInputRef}
                    className="flex-1"
                    required={formMode === 'add'}
                  />
                  {uploadedFile && (
                    <Button 
                      type="button" 
                      onClick={handleFileUpload} 
                      disabled={uploadProgress}
                      className="flex gap-1"
                    >
                      {uploadProgress ? 'Uploading...' : 'Upload'} <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Or enter image URL directly" {...field} />
                      </FormControl>
                      <FormDescription>
                        Upload an image file (required) or enter a URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Package title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Package description" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="₹50,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="7 days" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Thailand" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+919745500598" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center space-x-8">
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Package</FormLabel>
                        <FormDescription>
                          Highlight this package
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="early_bird"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Early Bird Offer</FormLabel>
                        <FormDescription>
                          Show early bird badge
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Package</Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
  
  const renderUpcomingPackages = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-deepblue">Upcoming Packages</h2>
        <Button onClick={handleAddNew} className="bg-deepblue hover:bg-deepblue-light">
          Add New Package
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Package Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packagesLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">Loading packages...</TableCell>
                </TableRow>
              ) : upcomingPackages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No upcoming packages found.</TableCell>
                </TableRow>
              ) : (
                upcomingPackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      {pkg.image_url ? (
                        <div className="h-12 w-16 overflow-hidden rounded-md">
                          <img 
                            src={pkg.image_url} 
                            alt={pkg.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-16 bg-gray-100 flex items-center justify-center rounded-md">
                          <Image className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{pkg.title}</TableCell>
                    <TableCell>{pkg.price}</TableCell>
                    <TableCell>{pkg.tour_dates?.[0]?.startDate || 'Not set'}</TableCell>
                    <TableCell>{pkg.tour_dates?.[0]?.endDate || 'Not set'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(pkg.id!)}
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(pkg.id!)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{formMode === 'add' ? 'Add New Upcoming Package' : 'Edit Upcoming Package'}</SheetTitle>
            <SheetDescription>
              Fill in the details to {formMode === 'add' ? 'create a new' : 'update the'} upcoming package.
            </SheetDescription>
          </SheetHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <FormLabel>Package Image *</FormLabel>
                {form.watch('image_url') && (
                  <div className="h-48 w-full overflow-hidden rounded-md mb-2">
                    <img 
                      src={form.watch('image_url')} 
                      alt="Package preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex gap-2 items-end">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    ref={fileInputRef}
                    className="flex-1"
                    required={formMode === 'add'}
                  />
                  {uploadedFile && (
                    <Button 
                      type="button" 
                      onClick={handleFileUpload} 
                      disabled={uploadProgress}
                      className="flex gap-1"
                    >
                      {uploadProgress ? 'Uploading...' : 'Upload'} <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Or enter image URL directly" {...field} />
                      </FormControl>
                      <FormDescription>
                        Upload an image file (required) or enter a URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Package title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Package description" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="₹50,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input placeholder="June 15, 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input placeholder="June 28, 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Thailand" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+919745500598" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center space-x-8">
                <FormField
                  control={form.control}
                  name="early_bird"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Early Bird Offer</FormLabel>
                        <FormDescription>
                          Show early bird badge
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="slots_available"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limited Slots</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="8"
                          {...field} 
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormDescription>
                        Leave empty if not limited
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Package</Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
  
  const renderBanners = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-deepblue">Banner Management</h2>
        <Button onClick={handleAddNew} className="bg-deepblue hover:bg-deepblue-light">
          Add New Banner
        </Button>
      </div>
      
      {bannersLoading ? (
        <div className="text-center py-8">
          <p>Loading banners...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p>No banners found. Add your first banner to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <Card key={banner.id}>
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={banner.image_url} 
                  alt={banner.caption || 'Banner'} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{banner.caption || 'Banner'}</h3>
                    <p className="text-sm text-gray-500">
                      {banner.active ? 'Active' : 'Inactive'} • Order: {banner.display_order}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(banner.id!)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(banner.id!)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{formMode === 'add' ? 'Add New Banner' : 'Edit Banner'}</SheetTitle>
            <SheetDescription>
              Upload and configure your homepage banner.
            </SheetDescription>
          </SheetHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <FormLabel>Banner Image</FormLabel>
                {form.watch('image_url') && (
                  <div className="h-48 w-full overflow-hidden rounded-md mb-2">
                    <img 
                      src={form.watch('image_url')} 
                      alt="Banner preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex gap-2 items-end">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    ref={fileInputRef}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={handleFileUpload} 
                    disabled={!uploadedFile || uploadProgress}
                    className="flex gap-1"
                  >
                    {uploadProgress ? 'Uploading...' : 'Upload'} <Upload className="h-4 w-4" />
                  </Button>
                </div>
                
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Or enter image URL directly" {...field} />
                      </FormControl>
                      <FormDescription>
                        Upload an image or enter a URL for the banner
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Caption</FormLabel>
                    <FormControl>
                      <Input placeholder="Banner caption (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com (optional)" {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional link when banner is clicked
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="display_order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))} 
                        />
                      </FormControl>
                      <FormDescription>
                        Lower numbers show first
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 space-y-0 h-full">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active</FormLabel>
                        <FormDescription>
                          Show this banner
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Banner</Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
  
  // Render appropriate section based on the active section
  const renderSection = () => {
    switch (section) {
      case 'packages':
        return renderExclusivePackages();
      case 'upcoming':
        return renderUpcomingPackages();
      case 'banners':
        return renderBanners();
      default:
        return renderDashboardOverview();
    }
  };
  
  return (
    <div>
      {renderSection()}
    </div>
  );
};

export default AdminDashboard;
