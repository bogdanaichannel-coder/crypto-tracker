export function Footer() {
  return (
    <footer className='border-t border-border bg-card/30'>
      <div className='px-4 md:px-6 py-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground'>
        <p>© 2026 CryptoTracker. Данные предоставлены CoinGecko API.</p>
        <div className='flex gap-4'>
          <a href='#' className='hover:text-foreground transition-colors'>
            О проекте
          </a>
          <a href='#' className='hover:text-foreground transition-colors'>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
