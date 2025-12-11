import { Playfair_Display, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster }s "@/components/ui/toaster";

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '700'],
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-pt-sans',
  weight: ['400', '700'],
});

export default function WaveLayout({
  children,
  share,
}: {
  children: React.ReactNode;
  share: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'font-sans antialiased',
        playfairDisplay.variable,
        ptSans.variable
      )}
    >
      {children}
      {share}
      <Toaster />
    </div>
  );
}
