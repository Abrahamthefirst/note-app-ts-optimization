import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type MultiValue } from 'react-select';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformData = (
  tagApiResponse: TagApiResponse[]
): MultiValue<{ label: string; value: string }> => {
  return tagApiResponse.map((tag) => ({ label: tag.name, value: tag.id }));
};
