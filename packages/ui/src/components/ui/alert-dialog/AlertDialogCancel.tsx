import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { Button } from '#components/ui/button';
import { cn } from '#lib/utils';

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> &
    Pick<React.ComponentPropsWithoutRef<typeof Button>, 'variant' | 'size'>
>(({ className, variant = 'outline', size = 'default', ...props }, ref) => (
  <Button variant={variant} size={size} asChild>
    <AlertDialogPrimitive.Cancel
      ref={ref}
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      {...props}
    />
  </Button>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
