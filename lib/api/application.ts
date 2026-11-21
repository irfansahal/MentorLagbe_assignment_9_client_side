const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


export const getCurrentStudentApplication = async (studentId : string |undefined) => {
    const res = await fetch(`${BASE_URL}/myApplications/${studentId}`);
    return res.json()
}


export const getApplicationOfCurrentUser = async (tutorId : string | undefined) => {
   const res =  await fetch(`${BASE_URL}/applicatios-of-current-user-tuition/${tutorId}`);
   return res.json()
}