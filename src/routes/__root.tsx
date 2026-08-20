import { DevTools } from '@/core/components/devTools';
import { Footer } from '@/core/components/layout/footer';
import { Header } from '@/core/components/layout/header';
import { TickerStrip } from '@/core/components/layout/tickerStrip';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <Header />
      <TickerStrip />

      <main className='flex-1 px-4 md:px-6 py-6'>
        <Outlet />
      </main>

      <Footer />
      <DevTools />
    </div>
  );
}
