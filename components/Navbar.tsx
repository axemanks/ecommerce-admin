// Navbar component - will fetch the list of stores and provide them to the store-switcher component

import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import { redirect } from 'next/navigation'

import { MainNav } from '@/components/main-nav'
import StoreSwitcher from '@/components/store-switcher'
import prismadb from '../lib/prismadb';


type Props = {}

const Navbar = async (props: Props) => {
    // Get the user id from clerk
    const {userId} = auth();
    // Check if the user is logged in
    if (!userId){
        redirect('/sign-in')
    }
    // Get all stores the user has created
    const stores = await prismadb.store.findMany({
        where: {
            userId: userId,
        }
    
    })


  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
            <StoreSwitcher items={stores}/>

                <MainNav className='mx-6' />
            
            <div className='ml-auto flex items-center space-x-4'>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
        </div>
  )
}

export default Navbar