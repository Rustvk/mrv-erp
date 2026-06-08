import * as React from 'react';
import { cn } from '#lib/utils';

export const AlertDialogMedia = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-dialog-media"
    className={cn(
      "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
      className,
    )}
    {...props}
  />
));
AlertDialogMedia.displayName = 'AlertDialogMedia';
