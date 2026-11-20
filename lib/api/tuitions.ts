const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getTuitions = async (userId : string | null) => {
      const res = await fetch(`${BASE_URL}/tuitions/${userId}`);
      return res.json()
}
