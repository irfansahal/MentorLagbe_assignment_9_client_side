
import React from 'react';

const workflow = [
    {
        title: 'User Registration & Roles',
        points: [
            'Users must register and log in before accessing restricted features.',
            'During registration, users can choose their role:',
            'Tutor: Can post and manage tuitions.',
            'Student: Can browse and apply for tuitions.',
            'Only registered tutors can post tuitions.',
            'Students cannot post tuitions.',
        ],
    },
    {
        title: 'Payment & Subscription',
        points: [
            'Integrate Stripe for online payments.',
            'Users can upgrade from Free to Pro.',
            'Once payment is successful, their account gets Pro permissions.',
            'Pro users can enjoy unlimited posting or applying based on their role.',
        ],
    },
];

const HowWorkSection = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            {/* Heading */}
            <h2 className="text-center text-3xl font-bold text-zinc-900">How It Works</h2>

            {/* Two divs with flex */}
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:justify-between">

                {workflow.map((item) => (
                    <div key={item.title} className="flex flex-col gap-4 md:w-1/2">
                        <h3 className="text-xl font-bold text-zinc-900">{item.title}</h3>

                        <ul className="flex flex-col gap-2 text-sm text-zinc-600 sm:text-base">
                            {item.points.map((point) => (
                                <li key={point} className="flex gap-2">
                                    <span aria-hidden="true">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default HowWorkSection;
