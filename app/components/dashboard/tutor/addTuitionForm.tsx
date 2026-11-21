"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { createTuition } from "@/lib/actions/tuitions"
import { authClient } from "@/lib/auth-client"
import { uploadImage } from "@/lib/uploadImage"
import Image from "next/image"
import { redirect, useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"

const classLevels = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "SSC", "HSC"]

const modes = ["Home Tutoring", "Online", "Both"]

const daysPerWeek = ["1", "2", "3", "4", "5", "6", "7"]

const AddTuitionForm = () => {
   
  const [ selectedImage , setSelectedImage ] = useState<File | "" | null>("")
  const [ prevImage , setPrevImage ] = useState("") 
  
  const router = useRouter()
  console.log(selectedImage);
  const { data : session , error } = authClient.useSession();
  const user = session?.user
  
  const token = session?.session.token

   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       const formData = new FormData(e.currentTarget);
       const tutionData = Object.fromEntries(formData.entries()) as {
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
  monthlyFee: string;
  daysPerWeek: string;
  description: string;
  image: string;
};
       console.log("tutionData",tutionData);
       
       if(selectedImage){
       const imageBBUrl = await uploadImage(selectedImage);
       if(imageBBUrl?.data?.url){
           tutionData.image = imageBBUrl?.data?.url
       }
       }
       
       if(!user){
         toast.add({
        title: "Error",
       description: "Please login first",
       });
         return 
       }

      const result = await createTuition({...tutionData,
        approvalStatus : "pending",
        isActive : true,
        createdAt : new Date().toLocaleDateString(),
        tutorName : user.name  ,
        tutorId : user.id ,
        tutorEmail : user.email 
       },token);
       
      console.log(result);
      if(result){
           toast.add({
        title: "Success",
        description: `You created a tuition successfully`,
       });
       router.push("/")
       }    
   }
    
   

   const handleImageChange = (e : ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if(file){
         setSelectedImage(file)
         setPrevImage(URL.createObjectURL(file))
     }
   }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Post a New Tuition</CardTitle>
        <CardDescription>
          Fill in the details below to post your tuition
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Math tutor for Class 9 student"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="e.g. Mathematics"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
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
            </div>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Dhanmondi, Dhaka"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="monthlyFee">Monthly Fee (৳)</FieldLabel>
                <Input
                  id="monthlyFee"
                  name="monthlyFee"
                  type="number"
                  placeholder="e.g. 8000"
                />
              </Field>

              <Field>
                <FieldLabel>Days/Week</FieldLabel>
                <Select name="daysPerWeek">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {daysPerWeek.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <textarea
                id="description"
                name="description"
                placeholder="Write a short description about the tuition..."
                rows={4}
                className="w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
              />
            </Field>

            { prevImage && (
                         <Image alt="uploadImage" src={prevImage} width={200} height={100} className="p-5"/>
                     )}

            <Field>
              <FieldLabel htmlFor="image">Image</FieldLabel>
              <Input id="image"  type="file" accept="image/*" onChange={handleImageChange}/>
            </Field>

            <Field>
              <Button type="submit">Post Tuition</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddTuitionForm
