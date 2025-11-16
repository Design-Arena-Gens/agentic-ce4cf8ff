"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isLight = resolvedTheme === 'light';
  return (
    <button
      className="button"
      aria-label="Basculer th?me clair/sombre"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      title={isLight ? 'Passer en sombre' : 'Passer en clair'}
    >
      {isLight ? '?? Sombre' : '?? Clair'}
    </button>
  );
}
