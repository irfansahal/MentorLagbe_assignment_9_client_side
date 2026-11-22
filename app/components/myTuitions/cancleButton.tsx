"use client"
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { cancleApplication } from '@/lib/actions/applications';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';

const CancleButton = ({applicationId}:{applicationId : string}) => {
    
    const router = useRouter()

    const { data : session  , error } = authClient.useSession();

    const token = session?.session.token 

    const deleteHandler = async () => {
        const deleteResult = await cancleApplication(applicationId, token)
         console.log(deleteResult);
         
        if(deleteResult.deletedCount > 0){             
         toast.add({
        title: "Success",
        description: `You deleted a application successfully`,
       });
          router.refresh()
        }
        if(deleteResult.deletedCount === 0){             
         toast.add({
        title: "Error",
        description: `Something Went Wrong`,
       });
          router.refresh()
        }
    }
    return (
        <>
           <Button type="button" variant="outline" onClick={deleteHandler}>Cancel</Button>   
        </>
    );
};

export default CancleButton;