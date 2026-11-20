
import { getCurrentStudentApplication } from '@/lib/api/application';
import type { Application } from '@/lib/actions/applications';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { headers } from 'next/headers';
import React from 'react';
import CancleButton from '@/app/components/myTuitions/cancleButton';

type ApplicationRow = Application & { _id: string };

const MyApplicationPage = async () => {

    const session = await auth.api.getSession({
        headers : await headers()
    })

    const studentId = session?.user.id

    const applicatins = await getCurrentStudentApplication(studentId)
    console.log("Myapplicatins", applicatins);

    const applications: ApplicationRow[] = Array.isArray(applicatins) ? applicatins : []

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold text-center">My Applications</h1>
            <div className="space-y-4 px-10 flex flex-col items-center justify-center">
                {applications.map((application) => (
                    <div
                        key={application._id}
                        className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4"
                    >
                        {/* Left: application details */}
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <h3 className="text-base font-semibold">{application.title}</h3>
                            <p className="text-sm text-muted-foreground">By {application.tutorName}</p>
                            <p className="text-sm text-muted-foreground">{application.tutorEmail}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span>Monthly Fee: ৳{application.monthlyFee}</span>
                                <span>Applied Date: {application.appliedDate}</span>
                            </div>
                        </div>

                        {/* Right: status and cancel */}
                        <div className="flex shrink-0 items-center gap-3">
                            <span
                                className={`rounded-full px-2 w-[80px] text-center py-0.5 text-xs font-medium ${
                                    application.status === "approved"
                                        ? "bg-green-500/15 text-green-600"
                                        : application.status === "rejected"
                                          ? "bg-red-500/15 text-red-600"
                                          : "bg-yellow-500/15 text-yellow-600"
                                }`}
                            >
                                {application.status}
                            </span>
                            <CancleButton/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyApplicationPage;
