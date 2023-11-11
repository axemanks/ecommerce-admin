// modal will be available anywhere in the app - ensure until the useEffect is run, it returns null - to eliminate hydration errors
"use client";
import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
        <StoreModal />
        </>
    )
};