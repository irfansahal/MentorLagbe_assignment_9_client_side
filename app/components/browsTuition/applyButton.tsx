"use client"
import React from 'react';
import { TuitionType } from '../dashboard/tutor/EditDialog';
import { authClient } from '@/lib/auth-client';
import { toast } from '@/components/ui/toast';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createApplication } from '@/lib/actions/applications';
import { useRouter } from 'next/navigation';

type Tuition = {
  approvalStatus: string;
  classLevel: string;
  createdAt: string;
  daysPerWeek: string;
  description: string;
  image: string;
  isActive: boolean;
  location: string;
  mode: string;
  monthlyFee: string;
  subject: string;
  title: string;
  tutorEmail: string;
  tutorId: string;
  tutorName: string;
  _id: string;
};

const ApplyButton = ({tuition}: {tuition : Tuition}) => {
    
     
     const { data : session , error } = authClient.useSession()
    
     const router = useRouter()

     console.log("new tuition",tuition);
     
     const user = session?.user; 
     
     const token = session?.session.token;

    //  (Phone, Preferred Schedule, Learning Note status: 'pending' 
    //  (Tuition Title, Tutor Name & Email, Monthly Fee, Applied Date, and Status Badge: Pending / Accepted / Rejected)

    const applyHandler = async (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault()

         const formData = new FormData(e.currentTarget)
         const studetnData = Object.fromEntries(formData.entries())

         if(user?.role !== "student"){
            toast.add({
         title: "Error",
         description: `You are not registared as student`,
         });
        return
         }
         
         const applicationData = {
           title : tuition.title,
           tutorName : tuition.tutorName,
           tutorEmail : tuition.tutorEmail,
           tuitorId : tuition.tutorId,
           monthlyFee : tuition.monthlyFee,
           appliedDate : new Date().toLocaleDateString(),
           status : tuition.approvalStatus,
           tuitionId : tuition._id,
           studentPhone : studetnData.phone as string,
           preferredSchedule : studetnData.schedule as string,
           learningNote : studetnData.note as string,
           studentId : user.id,
           studentName : user.name,
           studentEmail : user.email,
         }
       
         const result = await createApplication(applicationData, token);
         console.log("result",result);
         
         if (!result.insertedId) {
         toast.add({
                  title: "Error",
                  description: `Some thing went wront`,
                 });
         return;
         }

         if(result.insertedId){
             router.push("/browse-tuitions")   
          toast.add({
                  title: "Success",
                  description: `You applied successfully`,
                 });
         }

         console.log(result);
         
    } 

    return (
         <Dialog>
      <form>
        <DialogTrigger render={ <Button type="button"disabled={user?.role !== "student" ? true : false}  className="bg-amber-500 w-[200px]" 
                       
                        >Apply</Button>
} />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
            <form onSubmit={applyHandler}>
          <FieldGroup>
                <Field>
              <Label htmlFor="phone-1">Phone Number</Label>
              <Input id="phone-1" name="phone" placeholder="Enter your phone number" />
            </Field>
            <Field>
              <Label htmlFor="schedule-1">Preferred Schedule</Label>
              <Input id="schedule-1" name="schedule" placeholder="Enter your preferred schedule" />
            </Field>
            <Field>
              <Label htmlFor="note-1">Learning Note</Label>
              <Input id="note-1" name="note" placeholder="Enter your learning note" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
            </form>
        </DialogContent>
      </form>
    </Dialog>
    );
};

export default ApplyButton;