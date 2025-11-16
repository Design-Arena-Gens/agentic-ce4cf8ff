"use client";

import { motion } from 'framer-motion';
import type { TarotCard } from '@types/index';

export function Card({ card, faceUp, onClick }: { card: TarotCard; faceUp: boolean; onClick?: () => void }) {
  const suit = card.suit?.toLowerCase();
  const sigilClass = suit === 'b?tons' ? 'sigil-batons' : suit === 'coupes' ? 'sigil-coupes' : suit === '?p?es' ? 'sigil-ep?es' : suit === 'deniers' ? 'sigil-deniers' : '';

  return (
    <motion.div
      className="card"
      onClick={onClick}
      initial={{ rotateX: 0, rotateY: 0 }}
      animate={{ rotateY: faceUp ? 0 : 180 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      aria-label={`${card.name}${card.suit ? ` de ${card.suit}` : ''}${faceUp ? '' : ' (retourn?e)'}`}
      role="img"
    >
      <div className="face front" style={{ transform: 'rotateY(0deg)' }}>
        <div className={`minor-sigil ${sigilClass}`}>{card.arcana === 'Major' ? 'MAJEUR' : card.suit?.toUpperCase()}</div>
        <div className="gloss" />
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 14 }}>
          <div style={{
            display: 'grid', placeItems: 'center',
            width: '88%', height: '78%', borderRadius: 14,
            background: 'radial-gradient(120% 120% at 50% 20%, rgba(255,255,255,0.12), transparent 60%)',
            border: '1px solid var(--card-border)'
          }}>
            <div style={{ textAlign: 'center', lineHeight: 1.15 }}>
              <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>{card.arcana === 'Major' ? 'Arcane Majeur' : 'Arcane Mineur'}</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{card.name}</div>
              {card.suit && <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>{card.suit}</div>}
            </div>
          </div>
        </div>
        <div className="label">{card.numberLabel}</div>
      </div>
      <div className="face back" />
    </motion.div>
  );
}
