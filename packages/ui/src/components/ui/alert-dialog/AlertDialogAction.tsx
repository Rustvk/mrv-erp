import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { Button } from '#components/ui/button';
import { cn } from '#lib/utils';

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> &
    Pick<React.ComponentPropsWithoutRef<typeof Button>, 'variant' | 'size'>
>(({ className, variant = 'default', size = 'default', ...props }, ref) => (
  <Button variant={variant} size={size} asChild>
    <AlertDialogPrimitive.Action
      ref={ref}
      data-slot="alert-dialog-action"
      className={cn(className)}
      {...props}
    />
  </Button>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
