import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { client, Preference } from '@/lib/mercadopago';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId } = await req.json();

    if (planId !== 'pro') {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: 'plan-pro-mensual',
            title: 'Legalis Pro - Suscripción Mensual',
            unit_price: 4999,
            quantity: 1,
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: `${process.env.NEXTAUTH_URL}/pago/exitoso`,
          failure: `${process.env.NEXTAUTH_URL}/pago/error`,
          pending: `${process.env.NEXTAUTH_URL}/pago/pendiente`,
        },
        auto_return: 'approved',
        notification_url: `${process.env.WEBHOOK_URL}/api/payments/webhook`,
        external_reference: session.user.id,
      },
    });

    // Registrar el intento de pago
    await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount: 4999,
        mpPreferenceId: result.id,
        status: 'pending',
      },
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error('Error creating preference:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
