import * as React from 'react';
import { cn } from '#lib/utils';

export const AlertAction = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-action"
      className={cn('absolute top-2 right-2', className)}
      {...props}
    />
  ),
);
AlertAction.displayName = 'AlertAction';
