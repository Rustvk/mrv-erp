import * as React from 'react';

import { cn } from '#lib/utils';

export const Card = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { size?: 'default' | 'sm' }
>(({ className, size = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        className,
      )}
      {...props}
    />
  );
});
Card.displayName = 'Card';
