import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { activatePro } from '@/lib/subscription';

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get('topic') || url.searchParams.get('type');
    const id = url.searchParams.get('id') || url.searchParams.get('data.id');

    if (topic === 'payment' && id) {
      // Consultar el estado del pago a MercadoPago API
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      });

      if (response.ok) {
        const paymentData = await response.json();
        const userId = paymentData.external_reference;
        const status = paymentData.status;

        // Actualizar el registro de pago en nuestra BD
        await prisma.payment.updateMany({
          where: { mpPreferenceId: paymentData.preference_id },
          data: {
            mpPaymentId: id.toString(),
            status: status,
          },
        });

        if (status === 'approved') {
          await activatePro(userId);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
