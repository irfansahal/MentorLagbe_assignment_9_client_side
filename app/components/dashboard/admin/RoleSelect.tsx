"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/toast';
import { updatingUser } from '@/lib/actions/users';
import { useRouter } from 'next/navigation';
import React from 'react';

const roles = ["student", "tutor", "admin"];

const RoleSelect =  ({userId} : {userId : string }) => {

    const router = useRouter()

     const handleSelectValueChange = async (value : string | null) => {
         console.log("selectValue", value);
           const updateResult = await updatingUser(userId , { role : value });
           console.log("updateResult",updateResult);
           if(updateResult.modifiedCount > 0){
             toast.add({
             title: "Success",
            description: `You updated a user successfully`,
           });   
            router.refresh() 
           } 
           if(updateResult.modifiedCount === 0){
             toast.add({
             title: "Error",
            description: `Something Went Wrong`,
           }); 
           }
     }

    return (
        <Select onValueChange={handleSelectValueChange}>
            <SelectTrigger size="sm" className="w-32">
                <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                            {role}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default RoleSelect;
