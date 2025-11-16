"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DrawnCard } from '@types/index';
import { Card } from './Card';

export function Deck({ drawn, onFlip, containerRef }: {
  drawn: DrawnCard[];
  onFlip: (index: number) => void;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const [size, setSize] = useState<{w: number; h: number}>({ w: 0, h: 0 });

  useEffect(() => {
    function update() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    }
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerRef]);

  const cardsWithPixels = useMemo(() => drawn.map((d, i) => ({
    ...d,
    px: { left: d.x * size.w, top: d.y * size.h },
    z: 10 + i
  })), [drawn, size]);

  return (
    <div>
      <AnimatePresence>
        {cardsWithPixels.map((d, i) => (
          <motion.div
            className="card-outer"
            key={d.card.id}
            initial={{ opacity: 0, left: 20, top: size.h - 30 }}
            animate={{ opacity: 1, left: d.px.left, top: d.px.top }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ transform: 'translate(-50%, -50%)', zIndex: d.z }}
          >
            <Card card={d.card} faceUp={d.faceUp} onClick={() => onFlip(i)} />
            {d.label && (
              <div className="hint" style={{ marginTop: 8, textAlign: 'center' }}>{d.label}</div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
