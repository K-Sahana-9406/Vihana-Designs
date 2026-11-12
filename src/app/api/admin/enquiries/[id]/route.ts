import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const { status, internalNotes } = await request.json();

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: {
        status: status || undefined,
        internalNotes: internalNotes !== undefined ? internalNotes : undefined,
      },
    });

    return NextResponse.json({ success: true, enquiry });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

