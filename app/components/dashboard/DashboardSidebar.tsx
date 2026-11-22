"use client"
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const  menuItemsByRole = {
   admin : [
     { id: "dashboard", name: "Overview", url: "/dashboard/admin" },
     { id: "userManagement", name: "User Management", url: "/dashboard/admin/userManagement" },
     { id: "tuitions", name: "Admin Tuition Approval Flow", url: "/dashboard/admin/tuitions" },
     { id: "transactions", name: "Transaction Management", url: "/dashboard/admin/transactions" }
   ],
   tutor : [
     {  id: "dashboard", name: "Overview", url: "/dashboard/tutor"  },
     {  id: "post-tuition", name: "Post a Tuition Page", url: "/dashboard/tutor/post-tuition"  },
     {  id: "my-tuitions ", name: "My Created Tuitions", url: "/dashboard/tutor/my-tuitions"  },
     {  id: "applicants ", name: "Manage Applicants", url: "/dashboard/tutor/applicants"  }
   ], 
   student : [
      {  id: "dashboard", name: "Overview", url: "/dashboard/student"  },
      {  id: "my-applications", name: "My Applications", url: "/dashboard/student/my-applications"  },
   ]
}


const DashboardSidebar = () => {

    const { data : session , error } = authClient.useSession()
    const role = session?.user?.role || "student"

     console.log("role",menuItemsByRole[role], role);
     
    const user = session?.user
    

   
    return (
         <Sidebar className='bg-black'>
      <div className='pt-30 bg-black h-full text-white '>
        <SidebarHeader>
             <Link href={'/profile'}>
             <div className='pl-5 flex items-center gap-3 bg-[#fb9506] rounded-lg p-3'>
              <Avatar >
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>CN</AvatarFallback>
          </Avatar>
              <div>
                <h1>{user?.name}</h1>
              <h3>{user?.email}</h3>
              </div>
             </div>
             </Link>
          </SidebarHeader>  
      <SidebarContent>
        <SidebarGroup >
             <SidebarMenu>
  {menuItemsByRole[role].map((item) => (
    <SidebarMenuItem key={item.name}>
      <SidebarMenuButton render={<Link href={item.url} />}>
        {/* <project.icon /> */}
        <span>{item.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
      </div>
    </Sidebar>
    );
};

export default DashboardSidebar;