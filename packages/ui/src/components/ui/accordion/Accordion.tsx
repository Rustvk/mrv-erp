import * as React from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

import { cn } from '#lib/utils';

export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    data-slot="accordion"
    className={cn('flex w-full flex-col', className)}
    {...props}
  />
));
Accordion.displayName = 'Accordion';
