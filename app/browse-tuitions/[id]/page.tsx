
import { getOneTuitionById } from '@/lib/api/tuitions';
import { Button } from '@/components/ui/button';
import { TuitionType } from '@/app/components/dashboard/tutor/EditDialog';
import React from 'react';
import ApplyButton from '@/app/components/browsTuition/applyButton';

const TuitionDetailsPage = async ({params} : {params : { id : string }}) => {
    const { id } = await params
    console.log(id);
    
    const result = await getOneTuitionById(id)
    console.log("CurrentSingleTuition",result);


    

    const tuition: TuitionType = result?.data ?? result

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            {/* Big details card */}
            <div className="flex w-full flex-col gap-6 rounded-xl border border-border bg-card p-6 md:flex-row">
                {/* Left: image */}
                {tuition.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={tuition.image}
                        alt={tuition.title}
                        className="h-72 w-full shrink-0 rounded-lg border border-border object-cover md:h-auto md:w-96"
                    />
                ) : (
                    <div className="h-72 w-full shrink-0 rounded-lg border border-border bg-muted md:h-auto md:w-96" />
                )}

                {/* Right: details */}
                <div className="flex flex-1 flex-col gap-2">
                    <h1 className="text-2xl font-bold">{tuition.title}</h1>

                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Subject:</span> {tuition.subject}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Monthly Fee:</span> ৳{tuition.monthlyFee}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Mode:</span> {tuition.mode}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Location:</span> {tuition.location}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Description:</span> {tuition.description}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Days/Week:</span> {tuition.daysPerWeek}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Class Level:</span> {tuition.classLevel}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Posted On:</span> {tuition.createdAt}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Approval Status:</span> {tuition.approvalStatus}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Tutor Name:</span> {tuition.tutorName}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Tutor Email:</span> {tuition.tutorEmail}</p>

                    {/* Bottom: apply button */}
                     <ApplyButton tuition={tuition}/>
                </div>
            </div>
        </div>
    );
};

export default TuitionDetailsPage;
