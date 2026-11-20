const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const subscribedUser = async (userId : string | null) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/subscription`);
    return res.json()   
}