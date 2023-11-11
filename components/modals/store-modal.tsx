// Create new store modal
'use client';
// Global Imports
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

// Define form shape (schema)
const formSchema = z.object({
  name: z.string().min(1), // at least 1 character is required
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  // Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // TODO: create store
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
                      />
                    </FormControl>
                    <FormMessage>

                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                <Button type='submit'>Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
