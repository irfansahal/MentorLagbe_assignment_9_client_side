
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


export const checkoutVeryfy = async (session_id : string) => {
    const res = await fetch(`${BASE_URL}/payments/checkout-verify`, {
         method : 'POST',
         headers : {
             "Content-Type": "application/json"
         },
         body : JSON.stringify({session_id})
    });
    return res.json()
}