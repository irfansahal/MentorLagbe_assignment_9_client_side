"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"
import React, { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Role, UserRole } from "../components/signUp/signIn-form"


const roles : Role[]  = [
  { label : "Student", role : "student" },
  { label : "Tutor", role : "tutor" }
]

const ProfilePage = () => {
 
    
    const { data: session } = authClient.useSession()
    const user = session?.user
   
    const [ selectValue , setSelectValue ] = useState<UserRole | null |undefined >(undefined) 

  const signOutHandler = async () => {
      await authClient.signOut()
  }

  const submitHandler =async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fromData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(fromData.entries())
    console.log(userData);

    await authClient.updateUser({
        name : userData.name as string,
        image : userData.image as string , 
        role : selectValue ?? undefined
    })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 bg-muted px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">View your account information here</p>
      </div>

      {/* Upper card: image, name, email, sign out button */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-lg bg-white p-6 shadow-sm sm:flex-row">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            {user?.image && <AvatarImage src={user.image} alt={user.name || "User"} />}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="border-pink-500 bg-transparent text-pink-500 hover:bg-pink-50 hover:text-pink-600"
          onClick={signOutHandler}
        >
          Sign Out
        </Button>
      </div>

      {/* Lower card: update form */}
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
       
       <form onSubmit={submitHandler}>
         <div className="space-y-2 ">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={user?.name} placeholder="Name" />
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
            placeholder="Email"
          />
        </div> */}
       
      <div className="space-y-2 pt-5">
          <Select onValueChange={setSelectValue}>
  <SelectTrigger className="w-[280px] ">
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
      </div>


        <div className="space-y-2 pb-5">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            defaultValue={user?.image || ""}
            placeholder="Image URL"
          />
        </div>

        <Button type="submit" className="w-full bg-[#fb9506] text-white hover:bg-[#fbbe06] ">
          Update
        </Button>
       </form>
      </div>
    </div>
  )
}

export default ProfilePage
