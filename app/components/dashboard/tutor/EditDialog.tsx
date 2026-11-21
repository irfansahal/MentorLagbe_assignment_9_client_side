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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
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
import {  updateTuition } from "@/lib/actions/tuitions"
import { authClient } from "@/lib/auth-client"
import { uploadImage } from "@/lib/uploadImage"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { ChangeEvent, useState } from "react"

export type TuitionType = {
   title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
  monthlyFee: string;
  daysPerWeek: string;
  description: string;
  image: string;
  tutorEmail : string ;
     tutorId :  string, 
     tutorName : string,
     approvalStatus : string,
     createdAt : string,
     isActive : boolean,
     _id : string
} 

const classLevels = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "SSC", "HSC"]

const modes = ["Home Tutoring", "Online", "Both"]

const daysPerWeek = ["1", "2", "3", "4", "5", "6", "7"]

const EditDialog = ({ tuition }: { tuition: TuitionType }) => {
  
  const [ selectedImage , setSelectedImage ] = useState<File | "" | null>("")
  const [ prevImage , setPrevImage ] = useState("") 

  const router = useRouter()
  
  const { data : session , error } = authClient.useSession()
  
  const token = session?.session.token

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
 
    const formData = new FormData(e.currentTarget);
    const updateData = Object.fromEntries(formData.entries()) as {
      title: string;
      subject: string;
      classLevel: string;
      mode: string;
      location: string;
      monthlyFee: string;
      daysPerWeek: string;
      description: string;
    }
    console.log("updateData", updateData);
     
    const queryData = {
     approvalStatus : tuition.approvalStatus,
     classLevel : updateData.classLevel,
     createdAt : tuition.createdAt ,
     daysPerWeek :  updateData.daysPerWeek,
     description : updateData.description ,
     image : tuition.image, 
     isActive : tuition.isActive,
     location : updateData.location, 
     mode : updateData.mode, 
     monthlyFee : updateData.monthlyFee,
     subject : updateData.subject,
     title : updateData.title,
     tutorEmail : tuition.tutorEmail,
     tutorId :  tuition.tutorId, 
     tutorName : tuition.tutorName
         }

  if(selectedImage){
         const imageBBUrl = await uploadImage(selectedImage);
         if(imageBBUrl?.data?.url){
             queryData.image = imageBBUrl?.data?.url ?? tuition.image
         }
         }
 
         console.log("queryData",queryData);
        
         if (!tuition?._id) {
           return;
         }

         const updateResult = await updateTuition(tuition?._id, queryData, token);
         
         if(updateResult.modifiedCount > 0){
              toast.add({
        title: "Success",
        description: `You updated a tuition successfully`,
       });
       router.refresh()
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
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm">Edit</Button>} />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Tuition</DialogTitle>
          <DialogDescription>Update the tuition details below</DialogDescription>
        </DialogHeader>

        <Card className="w-full border-none shadow-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Tuition Information</CardTitle>
            <CardDescription>
              Change the fields you want to update
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <form onSubmit={submitHandler}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={tuition.title}
                    placeholder="e.g. Math tutor for Class 9 student"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="subject">Subject</FieldLabel>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    defaultValue={tuition.subject}
                    placeholder="e.g. Mathematics"
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Class Level</FieldLabel>
                    <Select name="classLevel" defaultValue={tuition.classLevel}>
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
                    <Select name="mode" defaultValue={tuition.mode}>
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
                    defaultValue={tuition.location}
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
                      defaultValue={tuition.monthlyFee}
                      placeholder="e.g. 8000"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Days/Week</FieldLabel>
                    <Select name="daysPerWeek" defaultValue={tuition.daysPerWeek}>
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
                    defaultValue={tuition.description}
                    placeholder="Write a short description about the tuition..."
                    rows={4}
                    className="w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                  />
                </Field>

                 { prevImage && (
                 <Image alt="uploadImage" src={prevImage} width={200} height={100} className="p-5"/>
                )}

                <Field>
                  <FieldLabel htmlFor="image">Banner Image</FieldLabel>
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange}/>
                </Field>

                <Field>
                  <Button type="submit">Save Changes</Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

export default EditDialog
