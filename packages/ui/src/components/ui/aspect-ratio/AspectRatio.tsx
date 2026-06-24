'use client';

import * as React from 'react';
import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ ...props }, ref) => {
  return <AspectRatioPrimitive.Root ref={ref} data-slot="aspect-ratio" {...props} />;
});

// Задаем displayName для удобной отладки в React DevTools
AspectRatio.displayName = AspectRatioPrimitive.Root.displayName || 'AspectRatio';

export { AspectRatio };
