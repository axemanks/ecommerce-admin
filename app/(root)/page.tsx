// Root page
"use client"
// Global Imports
import { useEffect } from 'react';
// Local Imports
import { useStoreModal } from '@/hooks/use-store-modal';



const SetupPage =() => {
  const onOpen = useStoreModal((state) => state.onOpen); // since we can use useStore in useEffect, we can just get the state from zustand
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    // check if the modal is open, if not, open it
    if (!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen]);


  return (
    <div  className='p-4'>
        Root Page
    </div>
  )
}
export default SetupPage;