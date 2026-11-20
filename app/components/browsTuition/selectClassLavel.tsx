"use client"

import { Field, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import React from 'react';

const classLevels = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "SSC", "HSC"]


const SelectClassLavel = () => {

   const route = useRouter()

   const handleSelectClasslavel = (value : string | null) => {
       console.log("SelectClasslavel", value);
       
       const params = new URLSearchParams(window.location.search);

       params.set("classLevel", value as string);

       route.push(`/browse-tuitions?${params.toString()}`)
       
   }

    return (
        <>
         <Field>
                  <FieldLabel>Class Level</FieldLabel>
                  <Select name="classLevel" onValueChange={handleSelectClasslavel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select class level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {classLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>   
        </>
    );
};

export default SelectClassLavel;