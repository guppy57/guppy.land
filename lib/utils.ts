import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  const options = {
    year: "numeric" as const,
    month: "short" as const,
    day: "numeric" as const,
  };
  return new Date(date).toLocaleDateString(undefined, options);
};
