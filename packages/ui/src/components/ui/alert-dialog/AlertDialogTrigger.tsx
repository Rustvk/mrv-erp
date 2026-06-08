import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

export const AlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>
>(({ ...props }, ref) => (
  <AlertDialogPrimitive.Trigger ref={ref} data-slot="alert-dialog-trigger" {...props} />
));
AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName;
