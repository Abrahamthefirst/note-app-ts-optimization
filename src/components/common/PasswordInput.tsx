import { Input } from '../ui/input';
import { FaRegEyeSlash } from 'react-icons/fa';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const PasswordInput = ({ field, style }: { field: any; style?: any }) => {
  const inputField = useRef<HTMLInputElement>(null);
  const togglePasswordVisibility = () => {
    if (inputField.current?.type === 'password') {
      inputField.current.type = 'text';
    } else if (inputField.current?.type === 'text') {
      inputField.current.type = 'password';
    }
  };
  return (
    <div className="flex justify-between border rounded-md border-black">
      <Input
        {...field}
        type="password"
        ref={inputField}
        className={cn(style, "border-none")}
      />
      <FaRegEyeSlash
        className="m-2 inline cursor-pointer"
        onClick={togglePasswordVisibility}
      />
    </div>
  );
};

export default PasswordInput;
