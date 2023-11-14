import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge Tailwind classes with clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatter
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})