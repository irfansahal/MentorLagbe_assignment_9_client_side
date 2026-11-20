"use client"

import { Field, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

const modes = ["Home Tutoring", "Online", "Both"]

const SelectMode = () => {
    return (
        <>
         <Field>
                  <FieldLabel>Mode</FieldLabel>
                  <Select name="mode">
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