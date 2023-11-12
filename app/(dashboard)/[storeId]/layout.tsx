// layout for dash


import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string };
}) {
    // get the user id from clerk
    const { userId} = auth(); 
    // check if the user is logged in
    if (!userId){
        redirect('/sign-in')
    }
    // find the store by storeId and user id
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId,
        }
    });
    // if the store is not found, redirect to /
    if (!store){
        redirect('/')
    }

    return (
        <>
        <Navbar />
        {children}
        </>
    )
}