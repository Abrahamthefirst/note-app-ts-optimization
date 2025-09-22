import { CircleX } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import toastEvent from './ToastEmitter';

export const toast = ({
  message,
  icon,
  timeout,
  handleClick,
  style,
}: Omit<ToastInput, 'id'>) => {
  const id = uuidv4();

  const newToast: ToastInput = { id, message, icon, timeout, style, handleClick };

  toastEvent.addToast(newToast);

  setTimeout(() => {
    toastEvent.removeToast(id);
  }, timeout ?? 4000);
};

export const successToast = (message: string) => {
  toast({
    message: message ?? 'Success! Your operation was completed.',
    icon: '✅',
    timeout: 3000,
    style: { backgroundColor: '#D4EDDA', color: '#155724' },
  });
};
export const errorToast = (message: string) => {
  toast({
    message: message ?? 'Error! Something went wrong.',
    icon: '❌',
    timeout: 5000,
    style: { backgroundColor: '#F8D7DA', color: '#721C24' },
  });
};
export const genericToast = (
  {
  message,
  icon,
  timeout,
  style,
  handleClick,
  }: {
      message: string,
  icon?: React.ReactNode,
  timeout?: number,
  style?: React.CSSProperties,
  handleClick?: () => void
  }
) => {
  toast({
    message,
    icon,
    handleClick,
    timeout,
    style,
  });
};
export const infoToast = (message: string) => {
  toast({
    message: message ?? 'Heads up! This is an informational message.',
    icon: 'ℹ️',
    timeout: 4000,
    style: { backgroundColor: '#CCE5FF', color: '#004085' },
  });
};
export const warningToast = (message: string) => {
  toast({
    message: message ?? 'Warning! Please review your input.',
    icon: '⚠️',
    timeout: 6000,
    style: { backgroundColor: '#FFF3CD', color: '#856404' },
  });
};
