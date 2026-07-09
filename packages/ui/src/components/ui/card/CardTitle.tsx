import * as React from 'react';
import { cn } from '#lib/utils';

export const CardTitle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-title"
        className={cn(
          'text-base leading-snug font-medium group-data-[size=sm]/card:text-sm',
          className,
        )}
        {...props}
      />
    );
  },
);
CardTitle.displayName = 'CardTitle';
