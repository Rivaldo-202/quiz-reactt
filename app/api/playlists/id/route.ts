import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single playlist
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!playlist) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(playlist);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch playlist' },
      { status: 500 }
    );
  }
}

// PUT update playlist
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, genre, mood } = body;

    const playlist = await prisma.playlist.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name,
        description,
        genre,
        mood,
      },
    });

    return NextResponse.json(playlist);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update playlist' },
      { status: 500 }
    );
  }
}

// DELETE playlist
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.playlist.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ message: 'Playlist deleted successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete playlist' },
      { status: 500 }
    );
  }
}