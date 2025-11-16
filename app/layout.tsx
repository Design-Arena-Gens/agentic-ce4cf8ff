import './globals.css';
import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarot de Marseille ? Tirages et Animations',
  description: 'Tirez le Tarot de Marseille avec des animations ?l?gantes et des tirages reproductibles (seed).',
  icons: [{ rel: 'icon', url: '/icon.svg' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
