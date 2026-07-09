import * as React from 'react';
import { cn } from '#lib/utils';

export const CardContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={cn('px-4 group-data-[size=sm]/card:px-3', className)}
        {...props}
      />
    );
  },
);
CardContent.displayName = 'CardContent';
