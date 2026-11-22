
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


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  
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
        
  
    
      const userData : {
       email : string,
       password : string,
     } = {
       email : Data.email as string,
       password : Data.password as string,
      }

      console.log("userData",userData);
     
      const { data , error } = await authClient.signIn.email({
       ...userData 
      }
  )
      if(data){
        toast.add({
        title: "User Logged In",
        description: `You logged in succesfully on email ${userData.email} `})
        redirect("/")
      }
      if(error){
        console.log('something went wrong');
        
      }

     
   }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Log in </CardTitle>
          <CardDescription>
            Enter your email and password to login your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <FieldGroup>             

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
                <Button type="submit" className="bg-amber-400">Sign in</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  {/* Do you have an account? <a href="/sign-up">Sign in</a> */}
                   Don&apos;t have an account? <a href="/sign-up">Sign up</a> 
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
