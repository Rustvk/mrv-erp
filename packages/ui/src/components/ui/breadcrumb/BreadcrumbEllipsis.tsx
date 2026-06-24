import * as React from 'react';
import { cn } from '#lib/utils';
import { MoreHorizontalIcon } from 'lucide-react';

export const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    className={cn('flex size-5 items-center justify-center [&>svg]:size-4', className)}
    {...props}
  >
    <MoreHorizontalIcon />
    <span className="sr-only">More</span>
  </span>
));
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
