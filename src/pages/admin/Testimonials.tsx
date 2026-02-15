
// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Textarea } from '@/components/ui/textarea';
// import { Input } from '@/components/ui/input';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Plus, Trash2, Upload, X, Image } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { apiClient } from '@/lib/api';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format } from 'date-fns';

// interface Testimonial {
//   id: string;
//   type: 'screenshot' | 'custom';
//   image_url?: string;
//   client_name?: string;
//   client_location?: string;
//   client_note?: string;
//   note_about_testimonial?: string;
//   created_at: string;
// }

// // Schema for screenshot testimonial
// const screenshotSchema = z.object({
//   note_about_testimonial: z.string().optional(),
// });

// // Schema for custom testimonial
// const customSchema = z.object({
//   client_name: z.string().optional(),
//   client_location: z.string().optional(),
//   client_note: z.string().min(1, 'Client note is required'),
// });

// type ScreenshotForm = z.infer<typeof screenshotSchema>;
// type CustomForm = z.infer<typeof customSchema>;

// const Testimonials: React.FC = () => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [activeTab, setActiveTab] = useState('screenshot');
//   const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
//   const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
//   const [clientImageFile, setClientImageFile] = useState<File | null>(null);
//   const [clientImagePreview, setClientImagePreview] = useState<string | null>(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   const screenshotForm = useForm<ScreenshotForm>({
//     resolver: zodResolver(screenshotSchema),
//     defaultValues: {
//       note_about_testimonial: '',
//     },
//   });

//   const customForm = useForm<CustomForm>({
//     resolver: zodResolver(customSchema),
//     defaultValues: {
//       client_name: '',
//       client_location: '',
//       client_note: '',
//     },
//   });

//   const { data: testimonials = [], isLoading, error } = useQuery({
//     queryKey: ['admin', 'testimonials'],
//     queryFn: () => apiClient.getAdminTestimonials(),
//   });

//   const addTestimonial = useMutation({
//     mutationFn: (testimonialData: FormData) => apiClient.addTestimonial(testimonialData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] });
//       queryClient.invalidateQueries({ queryKey: ['testimonials'] });
//       toast({
//         title: 'Testimonial Added',
//         description: 'Testimonial has been added successfully.',
//       });
//       resetForms();
//       setShowAddForm(false);
//     },
//     onError: () => {
//       toast({
//         title: 'Error',
//         description: 'Failed to add testimonial.',
//         variant: 'destructive',
//       });
//     },
//   });

//   const deleteTestimonial = useMutation({
//     mutationFn: (id: string) => apiClient.deleteTestimonial(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] });
//       queryClient.invalidateQueries({ queryKey: ['testimonials'] });
//       toast({
//         title: 'Testimonial Deleted',
//         description: 'Testimonial has been deleted successfully.',
//       });
//     },
//     onError: () => {
//       toast({
//         title: 'Error',
//         description: 'Failed to delete testimonial.',
//         variant: 'destructive',
//       });
//     },
//   });

//   const handleImageFileChange = (file: File, type: 'screenshot' | 'client') => {
//     if (type === 'screenshot') {
//       setScreenshotFile(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setScreenshotPreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setClientImageFile(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setClientImagePreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDrag = (e: React.DragEvent, type: 'screenshot' | 'client') => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent, type: 'screenshot' | 'client') => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleImageFileChange(e.dataTransfer.files[0], type);
//     }
//   };

//   const resetForms = () => {
//     screenshotForm.reset();
//     customForm.reset();
//     setScreenshotFile(null);
//     setScreenshotPreview(null);
//     setClientImageFile(null);
//     setClientImagePreview(null);
//   };

//   const handleDelete = (id: string) => {
//     if (window.confirm('Are you sure you want to delete this testimonial?')) {
//       deleteTestimonial.mutate(id);
//     }
//   };

//   const onSubmitScreenshot = async (data: ScreenshotForm) => {
//     if (!screenshotFile) {
//       toast({
//         title: 'Screenshot Required',
//         description: 'Please upload a screenshot for the testimonial.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       const formData = new FormData();
//       formData.append('type', 'screenshot');
//       formData.append('image', screenshotFile);
      
//       if (data.note_about_testimonial) {
//         formData.append('note_about_testimonial', data.note_about_testimonial);
//       }

//       await addTestimonial.mutateAsync(formData);
//     } catch (error) {
//       // Error handled by mutation
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const onSubmitCustom = async (data: CustomForm) => {
//     setIsSubmitting(true);
    
//     try {
//       const formData = new FormData();
//       formData.append('type', 'custom');
//       formData.append('client_note', data.client_note);
      
//       if (data.client_name) {
//         formData.append('client_name', data.client_name);
//       }
      
//       if (data.client_location) {
//         formData.append('client_location', data.client_location);
//       }
      
//       if (clientImageFile) {
//         formData.append('image', clientImageFile);
//       }

//       await addTestimonial.mutateAsync(formData);
//     } catch (error) {
//       // Error handled by mutation
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <div className="flex justify-center items-center h-64">
//           <p>Loading testimonials...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="flex justify-center items-center h-64">
//           <p className="text-red-500">Failed to load testimonials</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 h-screen flex flex-col overflow-hidden">
//       <div className="flex justify-between items-center mb-6 flex-shrink-0">
//         <div>
//           <h1 className="text-3xl font-bold">Testimonials</h1>
//           <p className="text-gray-600 mt-2">
//             Manage client testimonials and reviews ({testimonials.length} total)
//           </p>
//         </div>
//         <Button 
//           onClick={() => setShowAddForm(!showAddForm)}
//           className="flex items-center gap-2"
//         >
//           <Plus size={16} />
//           Add New Testimonial
//         </Button>
//       </div>

//       {/* Add New Testimonial Form */}
//       {showAddForm && (
//         <Card className="mb-6 flex-shrink-0">
//           <CardHeader>
//             <CardTitle>Add New Testimonial</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Tabs value={activeTab} onValueChange={setActiveTab}>
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="screenshot">✅ Upload Screenshot Testimonial</TabsTrigger>
//                 <TabsTrigger value="custom">✍️ Custom Testimonial Entry</TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="screenshot" className="space-y-6">
//                 <Form {...screenshotForm}>
//                   <form onSubmit={screenshotForm.handleSubmit(onSubmitScreenshot)} className="space-y-6">
//                     {/* Screenshot Upload */}
//                     <div className="space-y-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Upload Screenshot <span className="text-red-500">*</span>
//                       </label>
                      
//                       {!screenshotPreview ? (
//                         <div 
//                           className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
//                             dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
//                           }`}
//                           onDragEnter={(e) => handleDrag(e, 'screenshot')}
//                           onDragLeave={(e) => handleDrag(e, 'screenshot')}
//                           onDragOver={(e) => handleDrag(e, 'screenshot')}
//                           onDrop={(e) => handleDrop(e, 'screenshot')}
//                           onClick={() => document.getElementById('screenshot-file-input')?.click()}
//                         >
//                           <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                           <div className="space-y-2">
//                             <p className="text-gray-600">Click to upload or drag and drop</p>
//                             <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</p>
//                           </div>
//                           <input
//                             id="screenshot-file-input"
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => e.target.files && handleImageFileChange(e.target.files[0], 'screenshot')}
//                             className="hidden"
//                           />
//                         </div>
//                       ) : (
//                         <div className="border rounded-lg p-4 bg-gray-50">
//                           <div className="flex items-center justify-between mb-2">
//                             <span className="text-sm font-medium text-gray-700">Screenshot Preview:</span>
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               onClick={() => {
//                                 setScreenshotFile(null);
//                                 setScreenshotPreview(null);
//                               }}
//                               className="h-8 w-8 p-0"
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </div>
//                           <img
//                             src={screenshotPreview}
//                             alt="Screenshot preview"
//                             className="max-h-40 w-auto mx-auto rounded border"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <FormField
//                       control={screenshotForm.control}
//                       name="note_about_testimonial"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Note about this testimonial (Optional)</FormLabel>
//                           <FormControl>
//                             <Textarea 
//                               placeholder="Add any additional notes about this testimonial screenshot" 
//                               {...field} 
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <div className="flex justify-end gap-2">
//                       <Button 
//                         type="button" 
//                         variant="outline" 
//                         onClick={() => {
//                           setShowAddForm(false);
//                           resetForms();
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                       <Button type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? 'Adding...' : 'Add Testimonial'}
//                       </Button>
//                     </div>
//                   </form>
//                 </Form>
//               </TabsContent>

//               <TabsContent value="custom" className="space-y-6">
//                 <Form {...customForm}>
//                   <form onSubmit={customForm.handleSubmit(onSubmitCustom)} className="space-y-6">
//                     <FormField
//                       control={customForm.control}
//                       name="client_name"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Client Name (Optional)</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter client name" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={customForm.control}
//                       name="client_location"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Client Location (Optional)</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter client location" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={customForm.control}
//                       name="client_note"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Client Note <span className="text-red-500">*</span></FormLabel>
//                           <FormControl>
//                             <Textarea 
//                               placeholder="Enter the client's testimonial or review" 
//                               {...field} 
//                               rows={4}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     {/* Client Image Upload */}
//                     <div className="space-y-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Client Image (Optional)
//                       </label>
                      
//                       {!clientImagePreview ? (
//                         <div 
//                           className="relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer border-gray-300 hover:border-gray-400"
//                           onClick={() => document.getElementById('client-image-input')?.click()}
//                         >
//                           <Image className="mx-auto h-8 w-8 text-gray-400 mb-2" />
//                           <div className="space-y-1">
//                             <p className="text-sm text-gray-600">Click to upload client photo</p>
//                             <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
//                           </div>
//                           <input
//                             id="client-image-input"
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => e.target.files && handleImageFileChange(e.target.files[0], 'client')}
//                             className="hidden"
//                           />
//                         </div>
//                       ) : (
//                         <div className="border rounded-lg p-4 bg-gray-50">
//                           <div className="flex items-center justify-between mb-2">
//                             <span className="text-sm font-medium text-gray-700">Client Image:</span>
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               onClick={() => {
//                                 setClientImageFile(null);
//                                 setClientImagePreview(null);
//                               }}
//                               className="h-8 w-8 p-0"
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </div>
//                           <img
//                             src={clientImagePreview}
//                             alt="Client preview"
//                             className="h-20 w-20 object-cover rounded-full mx-auto border"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex justify-end gap-2">
//                       <Button 
//                         type="button" 
//                         variant="outline" 
//                         onClick={() => {
//                           setShowAddForm(false);
//                           resetForms();
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                       <Button type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? 'Adding...' : 'Add Testimonial'}
//                       </Button>
//                     </div>
//                   </form>
//                 </Form>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
//       )}

//       {/* Testimonials Grid */}
//       <Card className="flex-1 flex flex-col min-h-0">
//         <CardContent className="pt-6 px-6 pb-6 flex flex-col h-full">
//           {testimonials.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500 mb-4">No testimonials found</p>
//               <Button onClick={() => setShowAddForm(true)}>
//                 Create Your First Testimonial
//               </Button>
//             </div>
//           ) : (
//             <div className="overflow-auto flex-1">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {testimonials.map((testimonial: Testimonial) => (
//                   <div key={testimonial.id} className="border rounded-lg p-4 bg-white shadow-sm">
//                     {testimonial.image_url && (
//                       <div className="mb-3">
//                         <img
//                           src={testimonial.image_url}
//                           alt={testimonial.type === 'screenshot' ? 'Testimonial screenshot' : 'Client photo'}
//                           className={`w-full object-cover rounded-lg ${
//                             testimonial.type === 'screenshot' ? 'h-32' : 'h-16 w-16 rounded-full mx-auto'
//                           }`}
//                         />
//                       </div>
//                     )}
                    
//                     <div className="space-y-2">
//                       {testimonial.client_name && (
//                         <h3 className="font-semibold text-gray-900">{testimonial.client_name}</h3>
//                       )}
                      
//                       {testimonial.client_location && (
//                         <p className="text-sm text-gray-600">{testimonial.client_location}</p>
//                       )}
                      
//                       {testimonial.client_note && (
//                         <p className="text-sm text-gray-700">{testimonial.client_note}</p>
//                       )}
                      
//                       {testimonial.note_about_testimonial && (
//                         <p className="text-xs text-gray-500 italic">
//                           Note: {testimonial.note_about_testimonial}
//                         </p>
//                       )}
                      
//                       <div className="flex justify-between items-center pt-2">
//                         <span className="text-xs text-gray-400">
//                           {format(new Date(testimonial.created_at), 'MMM dd, yyyy')}
//                         </span>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleDelete(testimonial.id)}
//                           disabled={deleteTestimonial.isPending}
//                           className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
//                         >
//                           <Trash2 size={14} />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Testimonials;
