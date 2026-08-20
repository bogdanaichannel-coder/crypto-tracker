import { cn } from '@/core/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

// TODO: заменить моки на useQuery('/coins/markets', { limit: 15 })
const MOCK_TICKERS = [
  { symbol: 'BTC', price: 97_432.1, change: 2.34 },
  { symbol: 'ETH', price: 3_521.8, change: -1.12 },
  { symbol: 'SOL', price: 214.5, change: 5.67 },
  { symbol: 'BNB', price: 712.3, change: 0.44 },
  { symbol: 'XRP', price: 2.41, change: -3.21 },
  { symbol: 'ADA', price: 1.02, change: 1.8 },
  { symbol: 'DOGE', price: 0.412, change: -0.9 },
  { symbol: 'AVAX', price: 48.6, change: 3.05 },
];

function TickerItem({ symbol, price, change }: (typeof MOCK_TICKERS)[number]) {
  const positive = change >= 0;

  return (
    <div className='flex items-center gap-2 px-4 whitespace-nowrap'>
      <span className='text-sm font-medium text-foreground'>{symbol}</span>
      <span className='text-sm text-muted-foreground'>
        {price.toLocaleString('en-US', { maximumFractionDigits: 2 })}
      </span>
      <span
        className={cn(
          'flex items-center gap-0.5 text-xs font-semibold',
          positive ? 'text-emerald-500' : 'text-red-500',
        )}
      >
        {positive ? (
          <TrendingUp className='size-3' />
        ) : (
          <TrendingDown className='size-3' />
        )}
        {positive ? '+' : ''}
        {change.toFixed(2)}%
      </span>
    </div>
  );
}

export function TickerStrip() {
  const items = [...MOCK_TICKERS, ...MOCK_TICKERS]; // дублируем для бесшовной прокрутки

  return (
    <div className='relative w-full overflow-hidden border-b border-border bg-card/50 py-2'>
      <div className='animate-marquee flex w-max'>
        {items.map((item, i) => (
          <TickerItem key={`${item.symbol}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}
