"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import logo from "@/app/assets/Gemini_Generated_Image_dqy9vydqy9vydqy9.jpg"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar =  () => {
  const [open, setOpen] = useState(false)
   
  const { data : session , error } = authClient.useSession()
   
  const handleSignOut = async () => {
      await authClient.signOut()
  }

  const user = session?.user
  console.log("role", user?.role);
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-25 bg-[#fb9506]  items-center justify-between px-7">
        {/* Logo */}
        <Link href="/" className="flex h-16 w-28 shrink-0 items-center overflow-hidden sm:h-20 sm:w-40">
          <Image
            src={logo}
            alt="MentorLagbe"
            className="h-full w-full object-cover object-center"
          />
        </Link>

        {/* Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-bold text-white underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/browse-tuitions"
            className="font-extrabold text-white hover:text-zinc-500"
          >
            Browse Tuitions
          </Link>
          <Link
            href="/pricing"
            className="font-extrabold text-white hover:text-zinc-500"
          >
            Pricing/Pro Plans
          </Link>

           <Link
            href={`/dashboard/${user?.role}`}
            className="font-extrabold text-white hover:text-zinc-500"
          >
            Dashboard
          </Link>

          <Link
            href="/about"
            className="font-extrabold text-white hover:text-zinc-500"
          >
            About
          </Link>
        </nav>

        {/* Buttons */}
       {user ?
         <div className="flex items-center gap-3"> 
          <Avatar>
          <AvatarImage src={user.image || ""} />
          <AvatarFallback>CN</AvatarFallback>
          </Avatar> 
           <div>
             <h1 className="text-white font-extrabold ">{user.email}</h1>
             <button className="text-red-700 font-extrabold underline"
             onClick={handleSignOut}
             >sign out</button>
           </div> 
          </div> :  <div className="flex items-center gap-3">
          <Link
            href="/sign-up"
            className="rounded-md bg-[#fb9d06] border-2 border-white text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-amber-500 sm:px-5"
          >
            Sign Up
          </Link>
          <Link
            href="/sign-in"
            className="rounded-md bg-background px-3 py-2 text-sm font-semibold text-amber-400 hover:bg-pink-50 sm:px-5"
          >
            Sign In
          </Link>

          {/* Toggle button (mobile only) */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-md p-2 text-white hover:bg-white/20 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>}
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar with links (mobile only) */}
      <aside
        className={`fixed right-0 top-25 bottom-0 z-50 w-64 bg-[#fb9506] p-6 shadow-xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-bold text-white underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/browse-tuitions"
            onClick={() => setOpen(false)}
            className="font-extrabold text-white hover:text-zinc-500"
          >
            Browse Tuitions
          </Link>
          <Link
            href="/pricing"
            onClick={() => setOpen(false)}
            className="font-extrabold text-white hover:text-zinc-500"
          >
            Pricing/Pro Plans
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="font-extrabold text-white hover:text-zinc-500"
          >
            About
          </Link>
        </nav>
      </aside>
    </header>
  )
}

export default Navbar
