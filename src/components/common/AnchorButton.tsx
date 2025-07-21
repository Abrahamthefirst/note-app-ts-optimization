import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ClassValue } from 'clsx';
import { type ReactNode } from 'react';


type AnchorButton = {
  className: ClassValue;
  to: string;
  children: ReactNode;
  onClick?: () => void
};
const AnchorButton = ({ className, to, children, onClick}: AnchorButton) => {
  return (
    <Button asChild className={cn('', className)} onClick={onClick}>
      <Link to={to}>{children}</Link>
    </Button>
  );
};

export default AnchorButton;
