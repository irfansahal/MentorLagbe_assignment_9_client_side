"use client"

import { Field, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import React from 'react';

const modes = ["Home Tutoring", "Online", "Both"]

const SelectMode = () => {
     
  const router = useRouter()

    const handleSelectMode = (value : string | null) => {
       
      const params = new URLSearchParams(window.location.search);
      
      params.set("mode", value as string);

      router.push(`/browse-tuitions?${params.toString()}`)
       

    }

    return (
        <>
         <Field>
                  <FieldLabel>Mode</FieldLabel>
                  <Select name="mode" onValueChange={handleSelectMode}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {modes.map((mode) => (
                          <SelectItem key={mode} value={mode}>
                            {mode}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>   
        </>
    );
};

export default SelectMode;