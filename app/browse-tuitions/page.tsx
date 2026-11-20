
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from "react"
import SearchField from "../components/browsTuition/searchField"
import TuitionCard from "../components/browsTuition/TuitionCard"
import { TuitionType } from "../components/dashboard/tutor/EditDialog"
import SelectSubject from "../components/browsTuition/selectSubject"
import SelectClassLavel from "../components/browsTuition/selectClassLavel"
import SelectMode from "../components/browsTuition/selectMode"
import { getBrowsTuitions } from "@/lib/api/tuitions"




const BrowseTuition = async ({ searchParams} : {  searchParams : Promise<{[key: string]: string | string[] | undefined}>}) => {
  
    const search = await searchParams;

    const urlSearch = new URLSearchParams(search as Record<string, string>)

    const query = urlSearch.toString()
   
    console.log("query", query);
    
   const result = await getBrowsTuitions(query);
   const tuitions: TuitionType[] = Array.isArray(result) ? result : result?.data ?? [];
   
   console.log("tuitions",tuitions);
   
   
   

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      {/* Section 1: Search */}
      <Card>
        <CardHeader>
          <CardTitle>Find a Tuition</CardTitle>
          <CardDescription>Search and filter tuitions that match your needs</CardDescription>
        </CardHeader>
        <CardContent>
            <FieldGroup>
               <SearchField/>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <SelectSubject/>

                <SelectClassLavel/>

                <SelectMode/>

                
              </div>
            </FieldGroup>
          
        </CardContent>
      </Card>

      {/* Section 2: All Tuitions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">All Tuitions</h2>
        {tuitions.map((tuition) => {
          if(tuition.isActive === true && tuition.approvalStatus === "approved"){
             return(
               <TuitionCard key={tuition._id} tuition={tuition} />
             )
          }
        })}
      </section>
    </div>
  )
}

export default BrowseTuition
