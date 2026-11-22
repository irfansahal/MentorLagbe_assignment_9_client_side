
import { getAllTuitions } from '@/lib/api/tuitions';
import React from 'react';
import ApprovalStatusSelect from '@/app/components/dashboard/admin/ApprovalStatusSelect';

type TuitionType = {
    _id: string,
    title: string,
    subject: string,
    // description: string,
    monthlyFee: string,
    mode: string,
    location: string,
    isActive?: boolean,
    classLevel: string,
    createdAt?: string,
    approvalStatus?: string,
    image?: string
}

const Tuitions = async () => {

    const tuitions = await getAllTuitions()

    const allTuitions: TuitionType[] = Array.isArray(tuitions) ? tuitions : []

    return (
        <div className="space-y-4 px-10">
            <h1 className="text-xl font-semibold">All Tuitions</h1>

            <div className="flex flex-col gap-4">
                {allTuitions.map((tuition) => (
                    <div
                        key={tuition._id}
                        className="flex w-full items-center justify-between gap-6 rounded-xl border border-border bg-card p-5"
                    >
                        {/* Left: image and details */}
                        <div className="flex min-w-0 flex-1 items-start gap-4">
                            {tuition.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={tuition.image}
                                    alt={tuition.title}
                                    className="h-24 w-28 shrink-0 rounded-lg border border-border object-cover"
                                />
                            ) : (
                                <span className="flex h-24 w-28 shrink-0 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                                    No image
                                </span>
                            )}

                            <div className="flex min-w-0 flex-col gap-1">
                                <h3 className="text-base font-semibold">{tuition.title}</h3>
                                <p className="text-sm text-muted-foreground">Subject: {tuition.subject}</p>
                                 {/* <p className="text-sm text-muted-foreground">Description: {tuition.description}</p>  */}
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span>Monthly Fee: ৳{tuition.monthlyFee}</span>
                                    <span>Mode: {tuition.mode}</span>
                                    <span>Location: {tuition.location}</span>
                                    <span>Class Level: {tuition.classLevel}</span>
                                    <span>Active: {tuition.isActive ? "Active" : "Closed"}</span>
                                    <span>
                                        Created At: {tuition.createdAt ? new Date(tuition.createdAt).toLocaleDateString() : "N/A"}
                                    </span>
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                            tuition.approvalStatus === "approved"
                                                ? "bg-green-500/15 text-green-600"
                                                : tuition.approvalStatus === "rejected"
                                                  ? "bg-red-500/15 text-red-600"
                                                  : "bg-yellow-500/15 text-yellow-600"
                                        }`}
                                    >
                                        {tuition.approvalStatus 
                                        // || "pending"
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right: status select */}
                        <div className="shrink-0">
                            <ApprovalStatusSelect tuitionId={tuition._id}/>
                        </div>
                    </div>
                ))}

                {allTuitions.length === 0 && (
                    <p className="text-sm text-muted-foreground">No tuitions found</p>
                )}
            </div>
        </div>
    );
};

export default Tuitions;
