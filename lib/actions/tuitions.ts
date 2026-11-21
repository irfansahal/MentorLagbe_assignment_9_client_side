import { authClient } from "../auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type Tuition = {
      title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
  monthlyFee: string;
  daysPerWeek: string;
  description: string;
  image: string;
  _id? : string;
  approvalStatus : string;
   tutorEmail : string ;
     tutorId :  string, 
     tutorName : string,
     isActive : boolean,
     createdAt : string,
}


const getToken = () => {
     // const router = useRouter()
     const { data   , error } = authClient.useSession();
     // if(!data || data.session?.token){
          
     // }
     const token = data?.session.token;
     return token
}

export const createTuition = async  (data :Tuition , token:string |undefined) => {
    
     const res = await fetch(`${BASE_URL}/create-tuitions`, {
         method : "POST",
         headers : {
              "Content-Type": "application/json",
              authorization :  `Bearer ${token}` 
         },
         body : JSON.stringify(data)
    });
    return res.json()
}

// updating by tutor
export const updateTuition = async (tuitionId : string , updateData : Partial<Tuition>, token :string | undefined ) => {
     const res = await fetch(`${BASE_URL}/tuition/${tuitionId}`, {
           method : "PATCH",
         headers : {
              "Content-Type": "application/json",
              authorization :  `Bearer ${token}`
         },
         body : JSON.stringify(updateData)
     });
     return res.json()
}

export const deleteATuition = async ( tuitionId : string ) => {
     const res = await fetch(`${BASE_URL}/tuition-delete/${tuitionId}`, {
           method : "DELETE",

     });
     return res.json()
} 

// updating by admin 
export const updateTuitionByAdmin = async (tuitionId : string, data : { approvalStatus : string  | null} , token :string | undefined) => {
   const res = await fetch(`${BASE_URL}/tuition/${tuitionId}`,{
      method : 'PATCH',
      headers : {
              "Content-Type": "application/json",
              authorization :  `Bearer ${token}`
      },
      body : JSON.stringify(data)
   });
   return res.json();
} 