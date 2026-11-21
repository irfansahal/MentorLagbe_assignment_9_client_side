"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/toast';
import { updatingCurrentUserApplication } from '@/lib/actions/applications';
import React from 'react';

const options = ["accepted", "rejected"];



const ApplicationStatusSelect = ({applicationId}: {applicationId :string}) => {

  const handleSelection = async (value : string | null) => {
     console.log("select" , value , applicationId);
     
     const updateData = { status : value }

     const updateResult = await updatingCurrentUserApplication(applicationId, updateData);
     console.log("updateResult",updateResult);
     if(updateResult.modifiedCount > 0){
         toast.add({
             title : "success",
             description: `You updated status successfully`,
         })
     } 
}
      
    return (
        <Select onValueChange={handleSelection}>
            <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default ApplicationStatusSelect;
