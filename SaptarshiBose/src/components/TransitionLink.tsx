
import { ReactNode } from 'react';
import { usePageTransition } from '@/hooks/usePageTransition';

interface TransitionLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const TransitionLink = ({ to, children, className, onClick }: TransitionLinkProps) => {
  const { navigateWithTransition } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    navigateWithTransition(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default TransitionLink;
