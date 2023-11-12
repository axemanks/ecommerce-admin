// This form will be for settings
'use client';
import * as z from 'zod';
import { Store } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AlertModal } from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';

interface SettingsFormProps {
  initialData: Store;
}

// form schema
const formSchema = z.object({
  name: z.string().min(1),
});

// Type for settings form
type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  // form hook
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData, // pass the store as inital data
  });

  // Our onSubmit function - will be passed to the form handleSubmit function
  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh(); // refresh the page
      toast.success("Updates successful.")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false);
    }
  };

  // Delete function
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/")
      toast.success("Store deleted.")

    } catch (error) {
      toast.error("Make sure you removed all products and categories first.")
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
    {/* Alert Modal */}
    <AlertModal 
    isOpen={open}
    onClose={() => setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
      <div className='flex items-center justify-between'>
        <Heading
          title='Settings'
          description='Manage your store settings'
        />
        {/* button to delete store */}
        <Button
          disabled={loading}
          variant='destructive'
          size='icon'
          onClick={() => setOpen(true)}
        >
          <Trash className='w-4 h-4' />
        </Button>
      </div>
      {/* seperator */}
      <Separator />

      {/* form */}
      {/* spread the params from form */}
      <Form {...form}>
        {/* pass our onSubmit to the handleSubmit function of the form */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              // name of the field that will be controlled
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Save Changes button*/}
          <Button
            disabled={loading}
            className='ml-auto'
            type='submit'
          >
            Save changes
          </Button>
        </form>
      </Form>

      {/* seperator */}
      <Separator />

      {/* Api Alert */}
      <ApiAlert
      title='NEXT_PUBLIC_API_URL'
      description={`${origin}/api/${params.storeId}`}
      variant='admin'
      />
    </>
  );
};
