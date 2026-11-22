
import { checkoutVeryfy } from '@/lib/actions/payments'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

// import { stripe } from '../../lib/stripe'

export default async function Success({ searchParams }:{ searchParams : Promise<{ session_id : string}>}) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata ,
    customer_email ,
    payment_intent,
    payment_status
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete' && payment_status === "paid") {
    console.log({metadata ,
    customer_email ,
    payment_intent,
    payment_status});
    
     const result = await checkoutVeryfy(session_id);
     console.log({result})

    return (
      <section id="success" className="flex min-h-[60vh] items-center justify-center bg-muted px-6 py-16">
        <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
            <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="mt-6 text-3xl font-bold">Success</h2>

          <p className="mt-3 text-muted-foreground">
            We appreciate your business! A confirmation email will be sent to{' '}
            {/* {customerEmail}. */}
            If you have any questions, please email{' '}
            <a href="mailto:orders@example.com" className="text-[#fb9506] underline">
              orders@example.com
            </a>
            .
          </p>
        </div>
      </section>
    )
  }
}