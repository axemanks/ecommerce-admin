// This form will be for settings
'use client';
import * as z from 'zod';
import { Store } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

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

  // form hook
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData, // pass the store as inital data
  });

  // Our onSubmit function - will be passed to the form handleSubmit function
  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Settings'
          description='Manage your store settings'
        />
        {/* button to remove */}
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
    </>
  );
};
