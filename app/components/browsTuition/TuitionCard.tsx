import { Button } from "@/components/ui/button"
import { TuitionType } from "@/app/components/dashboard/tutor/EditDialog"
import Link from "next/link"

const TuitionCard = ({ tuition }: { tuition: TuitionType }) => {
    return (
        <div className="flex w-full items-start gap-4 rounded-xl border border-border bg-card p-4">
            {/* Left: image */}
            {tuition.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={tuition.image}
                    alt={tuition.title}
                    className="h-24 w-32 shrink-0 rounded-lg border border-border object-cover"
                />
            ) : (
                <div className="h-24 w-32 shrink-0 rounded-lg border border-border bg-muted" />
            )}

            {/* Middle: details */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="text-base font-semibold">{tuition.title}</h3>
                {/* <p className="text-sm text-muted-foreground">{tuition.subject}</p> */}
                <p className="text-sm text-muted-foreground">By {tuition.tutorName}</p>
                 <span
                    className={`rounded-full px-2 w-[80px] text-center py-0.5 text-xs font-medium ${
                        tuition.approvalStatus === "approved"
                            ? "bg-green-500/15 text-green-600"
                            : tuition.approvalStatus === "rejected"
                              ? "bg-red-500/15 text-red-600"
                              : "bg-yellow-500/15 text-yellow-600"
                    }`}
                >
                    {tuition.approvalStatus}
                </span>
                {/* <p className="text-sm text-muted-foreground">{tuition.mode}</p> */}
                {/* <p className="text-sm text-muted-foreground">{tuition.location}</p> */}
                {/* <p className="text-sm text-muted-foreground">{tuition.description}</p> */}
            </div>

            {/* Right: fee, class level, status and apply */}
            <div className="flex shrink-0 flex-col items-end gap-2">
                {/* <span className="text-sm font-semibold">৳{tuition.monthlyFee}/month</span> */}
                {/* <span className="text-sm text-muted-foreground">{tuition.classLevel}</span> */}
                
                <Link href={`/browse-tuitions/${tuition._id}`}><Button type="button" >See Details</Button></Link>
            </div>
        </div>
    )
}

export default TuitionCard
