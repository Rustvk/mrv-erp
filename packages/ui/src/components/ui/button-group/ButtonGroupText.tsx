import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '#lib/utils';

export const ButtonGroupText = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-lg border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
});
ButtonGroupText.displayName = 'ButtonGroupText';
