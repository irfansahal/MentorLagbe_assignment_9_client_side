const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const updatingUser = async (userId : string , data : { role : string | null}) => {
   const res = await fetch(`${BASE_URL}/updating-a-user/${userId}`, {
      method : 'PATCH',
      headers : {
        "Content-Type": "application/json"
      },
      body : JSON.stringify(data)
   });
   return res.json()
}