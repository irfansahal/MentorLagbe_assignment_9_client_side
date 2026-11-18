
import React from 'react';

type Plan = {
    name: string;
    price: string;
    features: string[];
};

const tutorPlans: Plan[] = [
    {
        name: 'Free Tutor Plan',
        price: '$0',
        features: [
            'Can post up to 2 tuitions.',
            'Can manage their posted tuitions.',
            'Can view how many students have applied for their tuitions.',
        ],
    },
    {
        name: 'Pro Tutor Plan',
        price: 'Premium',
        features: [
            'Can post unlimited tuitions.',
            'Can manage all posted tuitions.',
            'Can view all student applications.',
        ],
    },
];

const studentPlans: Plan[] = [
    {
        name: 'Free Student Plan',
        price: '$0',
        features: [
            'Can browse available tuitions.',
            'Can apply for up to 2 tuitions.',
        ],
    },
    {
        name: 'Pro Student Plan',
        price: 'Premium',
        features: [
            'Can browse available tuitions.',
            'Can apply for unlimited tuitions.',
        ],
    },
];

const PlanCard = ({ plan }: { plan: Plan }) => {
    const isPremium = plan.price === 'Premium';

    return (
        <div
            className={`flex flex-1 flex-col rounded-2xl border p-6 ${
                isPremium ? 'border-amber-500 bg-amber-50' : 'border-zinc-200 bg-white'
            }`}
        >
            <h3 className="text-lg font-bold text-zinc-900">{plan.name}</h3>
            <p className={`mt-2 text-2xl font-extrabold ${isPremium ? 'text-amber-600' : 'text-zinc-900'}`}>
                {plan.price}
            </p>

            <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-600">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const FreeVsProSection = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            {/* Two divs with flex */}
            <div className="flex flex-col gap-10 md:flex-row md:justify-between">

                {/* Left div: tutor plans */}
                <div className="flex flex-col gap-6 md:w-1/2">
                    <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                        Free vs. Pro Plans for Tutors
                    </h2>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        {tutorPlans.map((plan) => (
                            <PlanCard key={plan.name} plan={plan} />
                        ))}
                    </div>
                </div>

                {/* Right div: student plans */}
                <div className="flex flex-col gap-6 md:w-1/2">
                    <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                        Free vs. Pro Plans for Students
                    </h2>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        {studentPlans.map((plan) => (
                            <PlanCard key={plan.name} plan={plan} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FreeVsProSection;
