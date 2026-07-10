import type { PropsWithChildren } from 'react';
import { useScrollReveal } from './useScrollReveal';

interface AnimatedSectionProps extends PropsWithChildren {
  direction?: 'left' | 'right' | 'top';
  className?: string;
}

export function AnimatedSection({ direction = 'top', className, children }: AnimatedSectionProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} data-anime={direction} className={className}>
      {children}
    </div>
  );
}
