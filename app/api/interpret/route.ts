import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  // Expected body: { seed: string, spread: string, cards: Array<{ id: string, arcana: string, name: string, suit?: string, number: number, position?: string }> }
  return new Response(JSON.stringify({
    ok: true,
    message: 'Module d\'interpr?tation IA ? venir',
    echo: body,
    hints: [
      'Cet endpoint acceptera les cartes tir?es et renverra un texte interpr?tatif.',
      'Vous pourrez brancher un mod?le IA et des prompts personnalis?s.'
    ]
  }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}
