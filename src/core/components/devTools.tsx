import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Suspense } from 'react';

const showDevtools = import.meta.env.VITE_SHOW_DEVTOOLS === 'true';

export const DevTools = () => {
  return (
    <>
      {showDevtools && (
        <Suspense fallback={null}>
          <TanStackRouterDevtools />
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </>
  );
};
