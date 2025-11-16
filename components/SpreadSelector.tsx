"use client";

import { useId } from 'react';

export type SpreadKey = 'single' | 'linear3' | 'cross' | 'grand10';

export type SpreadDef = {
  key: SpreadKey;
  name: string;
  count: number;
  positions: Array<{ x: number; y: number; label?: string }>;
};

export const spreads: Record<SpreadKey, SpreadDef> = {
  single: {
    key: 'single',
    name: 'Tirage ? une carte',
    count: 1,
    positions: [ { x: 0.5, y: 0.5, label: 'Essence' } ]
  },
  linear3: {
    key: 'linear3',
    name: 'Lin?aire (Pass? / Pr?sent / Futur)',
    count: 3,
    positions: [
      { x: 0.25, y: 0.5, label: 'Pass?' },
      { x: 0.5, y: 0.5, label: 'Pr?sent' },
      { x: 0.75, y: 0.5, label: 'Futur' }
    ]
  },
  cross: {
    key: 'cross',
    name: 'Tirage en croix (5 cartes)',
    count: 5,
    positions: [
      { x: 0.5, y: 0.5, label: 'Sujet' },
      { x: 0.25, y: 0.5, label: 'Contre' },
      { x: 0.75, y: 0.5, label: 'Pour' },
      { x: 0.5, y: 0.28, label: 'Conscient' },
      { x: 0.5, y: 0.72, label: 'Inconscient' }
    ]
  },
  grand10: {
    key: 'grand10',
    name: 'Grand tirage (10 cartes)',
    count: 10,
    positions: [
      { x: 0.42, y: 0.5, label: '1' },
      { x: 0.5, y: 0.5, label: '2' },
      { x: 0.42, y: 0.28, label: 'Pass? proche' },
      { x: 0.42, y: 0.72, label: 'Futur proche' },
      { x: 0.34, y: 0.5, label: 'Fondation' },
      { x: 0.58, y: 0.5, label: 'Avenir' },
      { x: 0.76, y: 0.18, label: 'Vous' },
      { x: 0.86, y: 0.34, label: 'Environnement' },
      { x: 0.86, y: 0.58, label: 'Espoirs/Craintes' },
      { x: 0.86, y: 0.82, label: 'R?sultat' }
    ]
  }
};

export function SpreadSelector(props: { value: SpreadKey; onChange: (k: SpreadKey) => void }) {
  const id = useId();
  return (
    <select
      id={id}
      className="select"
      value={props.value}
      onChange={e => props.onChange(e.target.value as SpreadKey)}
      aria-label="Type de tirage"
    >
      {Object.values(spreads).map(s => (
        <option key={s.key} value={s.key}>{s.name}</option>
      ))}
    </select>
  );
}
