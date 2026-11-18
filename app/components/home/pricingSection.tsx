
import React from 'react';
import Image from "next/image";
import pricingImage from "../../assets/pricing.jpg";

const PricingSection = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            {/* Two divs with flex */}
            <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">

                {/* Left div: content */}
                <div className="flex flex-col gap-6 md:w-1/2">
                    <h3 className="text-xl font-bold text-zinc-900 sm:text-2xl">
                        Free Plan: <span className="font-normal text-zinc-600">Basic features available without payment.</span>
                    </h3>
                      <ul>
                         <li></li>
                      </ul>
                    <h3 className="text-xl font-bold text-zinc-900 sm:text-2xl">
                        Pro Plan: <span className="font-normal text-zinc-600">Premium features available through a paid subscription</span>
                    </h3>
                    <button
                        type="button"
                        className="w-fit rounded-md border-2 border-white bg-[#fb9d06] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-500"
                    >
                        Subscribe with Stripe
                    </button>
                </div>

                {/* Right div: image */}
                <div className="w-full md:w-1/2">
                    <Image
                        src={pricingImage}
                        alt="Payment with card"
                        className="h-auto w-full rounded-2xl shadow-xl"
                    />
                </div>

            </div>
        </section>
    );
};

export default PricingSection;
