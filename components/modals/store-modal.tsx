// Create new store modal
'use client';
// Global Imports
import * as z from 'zod';
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';

// Local Imports
import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '@/components/ui/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';


// Define form shape (schema)
const formSchema = z.object({
  name: z.string().min(1), // at least 1 character is required
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  // Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values); //TS
    // attempt to create a new store
    try {        
        setLoading(true); // disables the input and buttons

        // call api endpoing /api/stores
        const response = await axios.post('/api/stores', values);
        toast.success("Store created successfully");

    } catch (error) {
        console.log(error);
        toast.error("Something went wrong creating a new store, Please try again");
    } finally {
        setLoading(false);
    }
  };

  return (
    <Modal
      title='Create Store'
      description='Create a new empty store'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          {/* {...form} is a spread operator. It is used to unpack elements from an object or an array.  */}
          {/* If form is an object with properties like { field1: 'value1', field2: 'value2' }, then {...form} would be equivalent to writing { field1: 'value1', field2: 'value2' }. */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='E-Commerce'
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button
                  variant='outline'
                  onClick={storeModal.onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={loading}
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
