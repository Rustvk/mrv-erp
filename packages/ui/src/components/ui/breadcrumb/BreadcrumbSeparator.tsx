import * as React from 'react';
import { cn } from '#lib/utils';
import { ChevronRightIcon } from 'lucide-react';

export const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ children, className, ...props }, ref) => (
  <li
    ref={ref}
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRightIcon />}
  </li>
));
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
