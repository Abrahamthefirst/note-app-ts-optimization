import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type MultiValue } from 'react-select';

type Tag = {
  id: string;
  label: string;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformData = (
  defaultTagData: Tag[] | Tag
): MultiValue<{ label: string; value: string }> => {
  if (!Array.isArray(defaultTagData)) {
    return [{ label: defaultTagData.label, value: defaultTagData.id }];
  } else {
    return defaultTagData.map((tag) => ({ label: tag.label, value: tag.id }));
  }
};

