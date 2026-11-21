"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/toast';
import { updateTuitionByAdmin } from '@/lib/actions/tuitions';
import { useRouter } from 'next/navigation';
import React from 'react';

const statuses = ["approved", "rejected"];

const ApprovalStatusSelect = ({tuitionId} : {tuitionId : string}) => {
    
    const router = useRouter()

     const handleSelectValueChange = async (value : string | null) => {
         console.log(value);
         const updateResult = await updateTuitionByAdmin(tuitionId, { approvalStatus : value });
         if(updateResult.modifiedCount > 0){
            toast.add({
             title: "Success",
            description: `You updated a user successfully`,
           });
            router.refresh()
         }
     }

    return (
        <Select onValueChange={handleSelectValueChange}>
            <SelectTrigger size="sm" className="w-36">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                            {status}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ApprovalStatusSelect;
