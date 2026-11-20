"use client"
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import React from 'react';

const SearchField = () => { 

    const router = useRouter()

    const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries());
    
    console.log(formData.get("search"), data);
    
    const search = data.searchField 
    
    const params = new URLSearchParams();

    params.set("search", search as string);
    
    router.push(`/browse-tuitions/?${params.toString()}`)

    console.log(params);
    

  }

    return (
        <div>
             <form onSubmit={searchHandler}>
              <Field>
                <FieldLabel htmlFor="search">Search</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    name="searchField"
                    type="text"
                    placeholder="Search by title, subject or location..."
                  />
                  <Button type="submit">Search</Button>
                </div>
              </Field>
               </form>
      </div>
    );
};

export default SearchField; 