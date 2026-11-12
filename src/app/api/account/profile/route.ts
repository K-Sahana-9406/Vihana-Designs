import { NextResponse } from 'next/server';
import { getSession, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, phone, company, address, newPassword } = await request.json();

    const updateData: any = {
      name: name ? name.trim() : undefined,
    };

    if (newPassword && newPassword.length >= 6) {
      updateData.passwordHash = await hashPassword(newPassword);
    }

    await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...updateData,
        profile: {
          upsert: {
            create: { phone, company, address },
            update: { phone, company, address },
          },
        },
      },
    });

    return NextResponse.json({ success: true, message: 'Profile updated successfully.' });
  } catch (err: any) {
    console.error('[PROFILE UPDATE ERROR]', err);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

