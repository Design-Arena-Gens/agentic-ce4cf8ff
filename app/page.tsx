"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { ThemeToggle } from '@components/ThemeToggle';
import { SpreadSelector, spreads, type SpreadKey } from '@components/SpreadSelector';
import { Deck } from '@components/Deck';
import { generateDeck } from '@data/tarot';
import { createRng, shuffleWithRng } from '@utils/random';
import type { DrawnCard, TarotCard } from '@types/index';

export default function HomePage() {
  const [seed, setSeed] = useState<string>("marseille");
  const [spreadKey, setSpreadKey] = useState<SpreadKey>('single');
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentSpread = spreads[spreadKey];

  useEffect(() => {
    const baseDeck = generateDeck();
    const rng = createRng(seed);
    setDeck(shuffleWithRng(baseDeck, rng));
    setDrawn([]);
    setIsShuffled(true);
  }, [seed]);

  const remaining = useMemo(() => deck.filter(c => !drawn.some(d => d.card.id === c.id)), [deck, drawn]);

  function handleShuffle() {
    const baseDeck = generateDeck();
    const rng = createRng(seed);
    setDeck(shuffleWithRng(baseDeck, rng));
    setDrawn([]);
    setIsShuffled(true);
  }

  function handleDrawOne() {
    if (drawn.length >= currentSpread.count) return;
    const next = remaining[0];
    if (!next) return;

    const position = currentSpread.positions[drawn.length];
    setDrawn(prev => [
      ...prev,
      {
        card: next,
        faceUp: false,
        x: position.x,
        y: position.y,
        label: position.label
      }
    ]);
  }

  function handleDrawAll() {
    const toDraw = currentSpread.count - drawn.length;
    for (let i = 0; i < toDraw; i++) handleDrawOne();
  }

  function handleReset() {
    setDrawn([]);
    setIsShuffled(false);
  }

  function handleFlip(index: number) {
    setDrawn(prev => prev.map((d, i) => i === index ? { ...d, faceUp: !d.faceUp } : d));
  }

  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <span className="title-badge" aria-hidden>??</span>
          <div>
            <div>Tarot de Marseille</div>
            <div className="badge">Tirages reproductibles, animations et mode clair/sombre</div>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <div className="controls-bar">
        <input
          className="input"
          placeholder="Graine (seed) ? ex: marseille-2025"
          value={seed}
          onChange={e => setSeed(e.target.value)}
        />
        <SpreadSelector value={spreadKey} onChange={setSpreadKey} />
        <button className="button" onClick={handleShuffle}>M?langer</button>
        <button className="button" onClick={handleReset}>R?initialiser</button>
      </div>

      <div className="card-table" ref={containerRef}>
        <Deck
          containerRef={containerRef}
          drawn={drawn}
          onFlip={handleFlip}
        />

        <div className="deck-pile" onClick={handleDrawOne} role="button" aria-label="Tirer une carte">
          {remaining.length > 0 ? (
            <div>
              {remaining.length} cartes restantes
              <div className="hint">Cliquez ici pour tirer</div>
            </div>
          ) : (
            <div>Deck vide</div>
          )}
        </div>
      </div>

      <div className="bottom-bar">
        <button className="button" onClick={handleDrawOne}>Tirer</button>
        <button className="button" onClick={handleDrawAll}>Tout tirer</button>
        <div className="badge">Tirage: {currentSpread.name}</div>
      </div>
    </div>
  );
}
