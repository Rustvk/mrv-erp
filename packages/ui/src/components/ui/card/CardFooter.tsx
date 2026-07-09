import * as React from 'react';
import { cn } from '#lib/utils';

export const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn(
          'flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3',
          className,
        )}
        {...props}
      />
    );
  },
);
CardFooter.displayName = 'CardFooter';
