import type { TarotCard } from '@types/index';

const majors = [
  'Le Mat',
  'Le Bateleur',
  'La Papesse',
  'L?Imp?ratrice',
  'L?Empereur',
  'Le Pape',
  'L?Amoureux',
  'Le Chariot',
  'La Justice',
  'L?Hermite',
  'La Roue de Fortune',
  'La Force',
  'Le Pendu',
  'L?Arcane sans nom',
  'Temp?rance',
  'Le Diable',
  'La Maison Dieu',
  'L??toile',
  'La Lune',
  'Le Soleil',
  'Le Jugement',
  'Le Monde'
];

const suits = ['B?tons', 'Coupes', '?p?es', 'Deniers'] as const;
const ranks = [
  { n: 1, label: 'As' },
  { n: 2, label: 'Deux' },
  { n: 3, label: 'Trois' },
  { n: 4, label: 'Quatre' },
  { n: 5, label: 'Cinq' },
  { n: 6, label: 'Six' },
  { n: 7, label: 'Sept' },
  { n: 8, label: 'Huit' },
  { n: 9, label: 'Neuf' },
  { n: 10, label: 'Dix' },
  { n: 11, label: 'Valet' },
  { n: 12, label: 'Cavalier' },
  { n: 13, label: 'Reine' },
  { n: 14, label: 'Roi' }
];

export function generateDeck(): TarotCard[] {
  const deck: TarotCard[] = [];
  // Majors 0..21
  for (let i = 0; i < majors.length; i++) {
    const name = majors[i]!;
    deck.push({
      id: `M${i}`,
      arcana: 'Major',
      name,
      suit: null,
      number: i,
      numberLabel: roman(i)
    });
  }
  // Minors
  for (const suit of suits) {
    for (const r of ranks) {
      deck.push({
        id: `${suit[0]}${r.n}`,
        arcana: 'Minor',
        name: r.label,
        suit: suit,
        number: r.n,
        numberLabel: r.n <= 10 ? `${r.n}` : r.label
      });
    }
  }
  return deck;
}

function roman(n: number): string {
  if (n === 0) return '0';
  const map: [number, string][] = [
    [1000, 'M'], [900,'CM'], [500,'D'], [400,'CD'], [100,'C'], [90,'XC'], [50,'L'], [40,'XL'], [10,'X'], [9,'IX'], [5,'V'], [4,'IV'], [1,'I']
  ];
  let result = '';
  for (const [v, s] of map) {
    while (n >= v) { result += s; n -= v; }
  }
  return result;
}
