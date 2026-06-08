import * as React from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn('not-last:border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';
