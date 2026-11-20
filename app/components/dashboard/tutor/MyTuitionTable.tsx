"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import EditDialog, { TuitionType } from "./EditDialog"
import { deleteATuition } from "@/lib/actions/tuitions"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import IsActiveButton from "./isActiveButton"

const approvalStatuses = ["pending", "approved", "rejected"]


const MyTuitionTable = ({ tuitions }: { tuitions: TuitionType[] }) => {
  // if (tuitions.length === 0) {
  //   return <p className="text-sm text-muted-foreground">No tuitions found.</p>
  // }
      console.log("tuitions",tuitions);
      

  const router = useRouter()

  const deleteHandler = async (tuitionId : string) => {
      const deleteResult = await deleteATuition(tuitionId);
      if(deleteResult){
           toast.add({
        title: "Success",
        description: `You deleted a tuition successfully`,
       });
       router.refresh()
       }
  }

  

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[1700px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#fbad06] text-left text-xs font-semibold uppercase tracking-wide text-black">
            <th className="px-4 py-3">Banner Image</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Subject</th>
            <th className="px-4 py-3">Class Level</th>
            <th className="px-4 py-3">Mode</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Monthly Fee</th>
            <th className="px-4 py-3">Days/Week</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Approval Status</th>
            <th className="px-4 py-3">Active Status</th>
            <th className="px-4 py-3">Edit / Update</th>
            {/* <th className="px-4 py-3">See Details</th> */}
            <th className="px-4 py-3">Delete</th>
            <th className="px-4 py-3">Availability</th>
          </tr>
        </thead>
        <tbody>
          {tuitions.map((tuition, index) => (
            <tr
              key={tuition._id ?? index}
              className="border-b border-border last:border-b-0 even:bg-muted/50"
            >
              <td className="px-4 py-3">
                {tuition.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tuition.image}
                    alt={tuition.title}
                    className="h-12 w-20 rounded-md border border-border object-cover"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">No image</span>
                )}
              </td>

              <td className="max-w-[220px] px-4 py-3">{tuition.title}</td>

              <td className="px-4 py-3">{tuition.subject}</td>
              <td className="px-4 py-3">{tuition.classLevel}</td>
              <td className="px-4 py-3">{tuition.mode}</td>
              <td className="px-4 py-3">{tuition.location}</td>
              <td className="px-4 py-3">৳{tuition.monthlyFee}</td>
              <td className="px-4 py-3">{tuition.daysPerWeek}</td>
              <td
                className="max-w-[220px] truncate px-4 py-3"
                title={tuition.description}
              >
                {tuition.description}
              </td>

              <td className="px-4 py-3">
                {/* <Select defaultValue={tuition.approvalStatus || "pending"}>
                  <SelectTrigger size="sm" className="w-32">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {approvalStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
                {tuition.approvalStatus}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    tuition.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {tuition.isActive ? "Active" : "Closed"}
                </span>
              </td>

              <td className="px-4 py-3">
                <EditDialog tuition={tuition}/>
              </td>

              {/* <td className="px-4 py-3">
                <Button variant="outline" size="sm">
                  See Details
                </Button>
              </td> */}

              <td className="px-4 py-3">
                <Button variant="destructive" size="sm" onClick={()=>deleteHandler(tuition._id)}>
                  Delete
                </Button>
              </td>

              <td className="px-4 py-3">
                 <IsActiveButton tuition={tuition}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyTuitionTable
