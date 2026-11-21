const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getAllPayments = async () => {
    const res = await fetch(`${BASE_URL}/get-payments`);
    return res.json()
} 