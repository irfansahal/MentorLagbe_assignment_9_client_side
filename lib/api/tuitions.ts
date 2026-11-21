const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getTuitions = async (userId : string | null) => {
      const res = await fetch(`${BASE_URL}/tuitions/${userId}`);
      return res.json()
}

export const getBrowsTuitions = async (query ="") => {
      const res = await fetch(`${BASE_URL}/brows-tuition?${query}`);
      return res.json()
}

export const getOneTuitionById = async (tuitionId : string) => {
      const res = await fetch(`${BASE_URL}/one-Tuition-by-Id/${tuitionId}`);
      return res.json()
}

export const getAllTuitions = async () => {
      const res = await fetch(`${BASE_URL}/tuitions`);
      return res.json()
}