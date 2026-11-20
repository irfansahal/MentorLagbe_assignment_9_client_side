"use client"

import { Field, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import React from 'react';

const subjects = [
  { name: "Science", subjects: ["Physics", "Chemistry", "Biology"] },
  { name: "Mathematics", subjects: ["General Math", "Higher Math"] },
  { name: "Languages", subjects: ["English", "Bangla", "Arabic"] },
  { name: "Computer & IT", subjects: ["Programming", "Web Development", "Networking"] },
  { name: "Business", subjects: ["Accounting", "Finance", "Economics"] },
  { name: "Humanities", subjects: ["History", "Geography", "Civics"] },
  { name: "Admission Preparation", subjects: ["University Admission", "Medical", "Engineering"] },
  { name: "Professional Skills", subjects: ["Graphic Design", "Digital Marketing", "Communication"] },
  { name: "Test Preparation", subjects: ["IELTS", "TOEFL"] },
  { name: "Others", subjects: ["ICT", "Statistics"] },
]

const SelectSubject = () => {
  
  const router = useRouter();
  
  const handleSelectSubject = (value : string | null) => {
      const params = new URLSearchParams(window.location.search);

      params.set("subject", value as string);

      router.push(`/browse-tuitions?${params.toString()}`)
    }

    return (
        <>
         <Field>
                  <FieldLabel>Subject</FieldLabel>
                  <Select name="subject" onValueChange={handleSelectSubject}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((category) => (
                        <SelectGroup key={category.name}>
                          <SelectLabel>{category.name}</SelectLabel>
                          {category.subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>   
        </>
    );
};

export default SelectSubject;