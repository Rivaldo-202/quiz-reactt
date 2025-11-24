import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all playlists
export async function GET() {
  try {
    const playlists = await prisma.playlist.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(playlists);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch playlists' },
      { status: 500 }
    );
  }
}

// POST new playlist
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, genre, mood } = body;

    if (!name || !description || !genre || !mood) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        genre,
        mood,
      },
    });

    return NextResponse.json(playlist, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create playlist' },
      { status: 500 }
    );
  }
}