
import { getSixTuitions } from '@/lib/api/tuitions';
import Link from 'next/link';
import React from 'react';

const DynamicFeatured = async () => {

    const sixTuitions = await getSixTuitions();

    return (
        <section className="mx-auto max-w-6xl px-6 py-12">
            <h2 className="mb-6 text-3xl font-bold">Featured Tuitions</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sixTuitions?.map((tuition: { _id: string; 
                                             image: string; 
                                             title: string; 
                                             subject: string; 
                                             mode: string , 
                                             tutorName : string , 
                                             monthlyFee : string , 
                                             classLevel : string }) => (
                    <div
                        key={tuition._id}
                        className="flex items-center gap-4 rounded-lg border border-border bg-white p-4 shadow-sm"
                    >
                        {/* Small image */}
                        {tuition.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={tuition.image}
                                alt={tuition.title}
                                className="h-19 w-19 shrink-0 rounded-md object-cover"
                            />
                        ) : (
                            <div className="h-14 w-14 shrink-0 rounded-md bg-muted" />
                        )}

                        {/* Texts */}
                        <div className="min-w-0">
                            <h3 className="truncate text-lg font-bold">{tuition.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                {tuition.subject} &bull; {tuition.mode}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {tuition.classLevel} &bull; {tuition.monthlyFee}
                            </p>
                            <p className="text-sm text-muted-foreground font-bold">
                               By {tuition.tutorName}  <Link href={`browse-tuitions/${tuition._id}`}><span className='text-amber-500 pl-5'>See details</span></Link> 
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DynamicFeatured;
