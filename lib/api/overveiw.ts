const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


export const getStudentOverveiw = async (userId : string | undefined) => {
   const res = await fetch(`${BASE_URL}/studnet-overvew/${userId}`);
   return res.json()
}

export const getTutorOverveiw = async (userId : string | undefined) => {
    const res = await fetch(`${BASE_URL}/tutor-overvew/${userId}`);
    return res.json()
}

export const getAdminOverveiw = async () => {
    const res = await fetch(`${BASE_URL}/admin-overview`);
    return res.json()
}