"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';
import { TuitionType } from './EditDialog';
import { updateTuition } from '@/lib/actions/tuitions';
import { toast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const availabilityStatuses = [
    { label : "Active", value : true},
    { label : "Closed" , value : false }
]


const IsActiveButton = ({tuition}: {tuition : TuitionType}) => {
    const [ activeValue , setIsactive ] = useState(true)
   console.log("activeValue", activeValue);

   const router = useRouter()

   const { data : session , error } = authClient.useSession();

   const token = session?.session.token

     const handleActive = async (value: string | null) => {
         const updatedActive = await updateTuition(tuition._id, { isActive : Boolean(value) },token);
         console.log(updatedActive);
         
         if(updatedActive){
             toast.add({
                 title: "Success",
                 description: `You updated a tuition successfully`,
                })
                setIsactive(activeValue);
                router.refresh()
       }
  }
    return (
        <>
         <Select value={tuition.isActive  ? "Active" : "Closed" } onValueChange={handleActive}>
                  <SelectTrigger size="sm" className="w-28">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {availabilityStatuses.map((status) => (
                        <SelectItem key={status.label} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>   
        </>
    );
};

export default IsActiveButton;