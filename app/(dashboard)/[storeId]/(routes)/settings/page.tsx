// Settings for the store /storeId/settings

import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { SettingsForm } from './components/settings-form'; // import from components in settings route

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  // Get user Id from clerk
  const { userId } = auth();

  // Check if the user is logged in
  if (!userId) {
    redirect('/sign-in');
  }

  // Get the store from the params
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });

  // If the store is not found, redirect to /
  if (!store) {
    redirect('/');
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store} />
        </div>
    </div>
  );
};
export default SettingsPage;
