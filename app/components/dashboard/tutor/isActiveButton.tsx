"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';
import { TuitionType } from './EditDialog';
import { updateTuition } from '@/lib/actions/tuitions';
import { toast } from '@/components/ui/toast';

const availabilityStatuses = [
    { label : "Active", value : true},
    { label : "Closed" , value : false }
]


const IsActiveButton = ({tuition}: {tuition : TuitionType}) => {
    const [ activeValue , setIsactive ] = useState(true)
   console.log("activeValue", activeValue);
  

     const handleActive = async (value: string | null) => {
         const updatedActive = await updateTuition(tuition._id, { isActive : Boolean(value) });
         console.log(updatedActive);
         
         if(updatedActive){
             toast.add({
                 title: "Success",
                 description: `You updated a tuition successfully`,
                })
                setIsactive(!value);
       }
  }
    return (
        <>
         <Select defaultValue={tuition.isActive ? "Actibe" : "Closed" } onValueChange={handleActive}>
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