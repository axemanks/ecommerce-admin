// Hook for safely accessing the window object in Next 14
// on the server the window object does not exist, only available in the browser
"use client"
import { useState, useEffect } from "react";


// useOrigin is used to generate a full URL
export const useOrigin = () => {
    const [mounted, setMounted] = useState(false);
    // check if the window is available - if it is check window.loction exists, then set the origin - otherwise empty string
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : '';
    
    // Hydration trick
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return '';
    }

    return origin;
};


