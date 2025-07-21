import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
type Tag = {
  id: string;
  label: string;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transformData = (defaultTagData: Tag[]) => {
    return defaultTagData.map((tag) => ({ label: tag.label, value: tag.id }));
  };