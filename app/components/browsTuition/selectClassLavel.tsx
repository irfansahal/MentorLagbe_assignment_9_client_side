"use client"

import { Field, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

const classLevels = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "SSC", "HSC"]


const SelectClassLavel = () => {
    return (
        <>
         <Field>
                  <FieldLabel>Class Level</FieldLabel>
                  <Select name="classLevel">
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