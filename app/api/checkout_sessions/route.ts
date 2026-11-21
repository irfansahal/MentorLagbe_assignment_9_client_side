import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { auth } from '@/lib/auth';

export async function POST(req : Request) {

    "use server";
    const UserSession = await auth.api.getSession({
        headers: await headers()
    })

    const user = UserSession?.user
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const formData = await req.formData()
    const product = formData.get('product')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        //   price: 'price_1UduDrPsUB0cWEeh20Sweb8V',
         
         price:
            product === 'tutor'
              ? 'price_1UduDrPsUB0cWEeh20Sweb8V'
              : product === 'student'
                ? 'price_1UdvitPsUB0cWEehZVfWaMOr'
                : '',

        quantity: 1,
        },
      ],
      customer_email : user?.email,
      mode: 'payment',
      metadata : {
        userId : user?.id as string,
        userName : user?.name as string,
        userRole : user?.role as string,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: 'MentorLagbe_001',
    });
    return NextResponse.redirect(session.url as string, 303)
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err)) 
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

