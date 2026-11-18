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
import { useState } from "react"


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

  const [ selectValue , setSelectValue ] = useState("")
  console.log("selectValue",selectValue);
  
   const submitHandler = (e : React.FormEvent<HTMLElement>) => {
     e.preventDefault()
     const formData = new FormData(e.currentTarget as HTMLFormElement) 
     const Data = Object.fromEntries(formData.entries());
     
     const userData = {
       fullname : Data.name,
       email : Data.email,
       password : Data.password,
       role : selectValue,
       subscription : "free"
      }
      console.log("userData",userData);
     
   }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                <Input id="password" type="password" required />
              </Field>

<Field>
                <FieldLabel htmlFor="image">User Image</FieldLabel>
                <Input
                  id="image"
                  type="file"
                  placeholder="choose an image "
                  required
                  name="image"
                />
              </Field>

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
