
import React from 'react';
import CheckoutSections from '@/app/components/checkout/CheckoutSections';

const CheckhOutPage = async ({ searchParams }:{ searchParams: Promise<{ canceled?: string }> }) => {

    const { canceled } = await searchParams

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and check out when you\'re ready.'
    )
  }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div>
      <h1 className="text-xl font-semibold">Choose your subscription</h1>

      {/* Top buttons (static) */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" className="rounded-full   px-4 py-2.5 text-sm font-medium">
          Tutor
        </button>
        <button type="button" className="rounded-full border border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground">
          Student
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Left: tutor card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-600">
            Tutor plan
          </span>

          <p className="mt-4">
            <span className="text-4xl font-bold">$15</span>
            <span className="text-muted-foreground"> / month</span>
          </p>

          <h2 className="mt-3 text-lg font-semibold">Pro Tutor</h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Post unlimited tuitions.</li>
            <li>Manage all tuition posts.</li>
            <li>Receive student applications.</li>
            <li>Access Pro features.</li>
          </ul>

           <form action="/api/checkout_sessions" method="POST">
            <input type="hidden" name="product" value="tutor" />
      <section>
        <button type="submit" role="link" className="mt-6 w-full rounded-full bg-foreground py-4 text-background">
          Upgrade to Pro
        </button>
      </section>
    </form>
        </div>

        {/* Right: student card */}
        <div className="rounded-xl border border-border bg-card p-6">
          <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-xs font-medium text-blue-500">
            Student plan
          </span>

          <p className="mt-4">
            <span className="text-4xl font-bold">$10</span>
            <span className="text-muted-foreground"> / month</span>
          </p>

          <h2 className="mt-3 text-lg font-semibold">Pro Student</h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Apply for more tuitions.</li>
            <li>Manage applications.</li>
            <li>Access Pro features.</li>
          </ul>

           <form action="/api/checkout_sessions" method="POST">
           <input type="hidden" name="product" value="student" />
      <section>
        <button type="submit" role="link" className="mt-6 w-full rounded-full bg-foreground py-4 text-background">
          Upgrade to Pro
        </button>
      </section>
    </form>
        </div>
      </div>
    </div>
        </div>
    );
};

export default CheckhOutPage;
