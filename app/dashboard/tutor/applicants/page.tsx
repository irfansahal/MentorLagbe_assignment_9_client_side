
import { getApplicationOfCurrentUser } from '@/lib/api/application';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import ApplicationStatusSelect from '@/app/components/dashboard/tutor/ApplicationStatusSelect';

type ApplicationRow = {
    _id: string,
    title: string,
    studentName: string,
    studentEmail?: string,
    studentPhone: string,
    preferredSchedule: string,
    learningNote: string,
    status : string,
}

const MyApplication = async () => {

    const session = await auth.api.getSession({
        headers : await headers()
    })

    const user = session?.user

    const applications = await getApplicationOfCurrentUser(user?.id)

    const myApplications: ApplicationRow[] = Array.isArray(applications) ? applications : []

    return (
        <div className="space-y-4 px-10">
            <h1 className="text-xl font-semibold">Applicants</h1>

            <div className="flex flex-col gap-4">
                {myApplications.map((application) => (
                    <div
                        key={application._id}
                        className="flex w-full items-center justify-between gap-6 rounded-xl border border-border bg-card p-5"
                    >
                        {/* Left: application details */}
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <h3 className="text-base font-semibold">{application.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                Student Name: {application.studentName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Email: {application.studentEmail || "N/A"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Phone: {application.studentPhone}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Preferred Schedule: {application.preferredSchedule}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Note: {application.learningNote}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                status : {application.status}
                            </p>
                        </div>

                        {/* Right: status select */}
                        <div className="shrink-0">
                            <ApplicationStatusSelect applicationId={application._id}/>
                        </div>
                    </div>
                ))}

                {myApplications.length === 0 && (
                    <p className="text-sm text-muted-foreground">No applicants yet</p>
                )}
            </div>
        </div>
    );
};

export default MyApplication;
