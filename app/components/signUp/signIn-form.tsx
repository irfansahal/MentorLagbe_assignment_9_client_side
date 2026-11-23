"use client"
import { cn } from "cn"

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
  FieldDescription,
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
import { ChangeEvent, useState } from "react"
import { uploadImage } from "@/lib/uploadImage"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { toast } from "@/components/ui/toast"

export type UserRole = "tutor" | "student";

export type Role = {
  label : string,
  role : string,
}

const roles : Role[]  = [
  { label : "Student", role : "student" },
  { label : "Tutor", role : "tutor" }
]

export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [ selectValue , setSelectValue ] = useState<UserRole| "" |null>("")
  const [ selectImage , setSelectImage ] = useState<File|null>(null)
  const [ prevImage , setPrevImage ] = useState<string | null>(null)

  console.log("selectValue",selectValue);


   const submitHandler = async (e : React.FormEvent<HTMLFormElement>) => {
     e.preventDefault()
     const formData = new FormData(e.currentTarget as HTMLFormElement) 
     const Data = Object.fromEntries(formData.entries()) 
    //  as {
    //     name : string,
    //    email : string,
    //    password : string,
    //    role : "tutor" | "student",
    //    subscription : "free",
    //    image : string
    //  }
        if(!selectValue){
      toast.add({
        title: "Error",
        description: "You have to slelect any one option, student or tutor",
       });
       return
  }
    
      const userData : {
        name : string,
       email : string,
       password : string,
       role : "tutor" | "student",
       subscription : "free",
       image? : string
     } = {
       name : Data.name as string,
       email : Data.email as string,
       password : Data.password as string,
       role : selectValue as "tutor" | "student",
       subscription : "free"
      }

    if(selectImage){
       const imageBBUrl = await uploadImage(selectImage)
       if(imageBBUrl?.data?.url){
        userData.image = imageBBUrl?.data?.url 
       }
      }
      console.log("userData",userData);
     
      const { data , error } = await authClient.signUp.email({
       ...userData 
      }
  )
      if(data){
        toast.add({
        title: "User Registared",
        description: `${userData.name} registared on ${userData.email}`,
       })
        redirect("/")
      }
      if(error){
        console.log(`something went wrong ${error.message}`);
         toast.add({
        title: "Error",
        description: `Error : ${error.message}`,
       })
      }

     
   }

   const handleImageChange = (e : ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log(file);
        if(file){
          setSelectImage(file)
          setPrevImage(URL.createObjectURL(file))
        }
   }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register As A New User</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  required
                  name="name"
                />
              </Field>

             <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                />
              </Field>

<Select onValueChange={setSelectValue}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="select a role" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {roles.map((item) => (
        <SelectItem key={item.label} value={item.role}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </Field>

<Field>
                <FieldLabel htmlFor="image">User Image</FieldLabel>
                <Input
                  id="image"
                  type="file"
                  placeholder="choose an image "
                  required
                  name="image"
                  onChange={handleImageChange}
                />
              </Field>
               
                  { prevImage && (
              <Image alt="uploadImage" src={prevImage} width={200} height={100} className="p-5"/>
          )}

              <Field>
                <Button type="submit" className="bg-amber-400">Sign Up</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Do you have an account? <a href="/sign-in">Sign in</a>
                  {/* Don&apos;t have an account? <a href="#">Sign up</a> */}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
