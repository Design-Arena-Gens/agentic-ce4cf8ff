export type Arcana = 'Major' | 'Minor';

export type TarotCard = {
  id: string;
  arcana: Arcana;
  name: string;
  suit: 'B?tons' | 'Coupes' | '?p?es' | 'Deniers' | null;
  number: number; // 0-21 majors, 1-14 minors (1=As)
  numberLabel: string;
};

export type DrawnCard = {
  card: TarotCard;
  faceUp: boolean;
  x: number; // normalized 0..1
  y: number; // normalized 0..1
  label?: string;
};
