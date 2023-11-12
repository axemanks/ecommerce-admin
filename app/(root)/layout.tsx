// layout for Root - checks for user and locates store they have created. If they have not created a store, it will redirect them to the store creation modal. If they have created a store, it will redirect them to the store dashboard.

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // get the user id from clerk
  const { userId } = auth();

  // check if the user is logged in
  if (!userId) {
    // if not logged in, redirect to sign in
    redirect('/sign-in');
  }

  // find first active store the user has created
  const store = await prismadb.store.findFirst({
    where: {
      userId: userId,
    },
  });

  // if the store is found, redirect to the store
  if (store) {
    redirect(`/${store.id}`);
  }

  return (
    <>
    {children}
    </>
  )
}
