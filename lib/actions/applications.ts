const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type Application = {
           title : string,
           tutorName : string,
           tutorEmail : string,
           monthlyFee : string,
           appliedDate : string,
           status : string,
           studentPhone : string,
           preferredSchedule : string,
           learningNote : string 
    
}

export const createApplication = async (data : Application) => {
    const res = await fetch(`${BASE_URL}/create-application/`,{
        method : "POST",
        headers : {
                 "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
    });
    return res.json()
}

export const updatingCurrentUserApplication = async (applictionId: string , data : { status : string | null}) => {
    const res = await fetch(`${BASE_URL}/updating-application-status/${applictionId}`,{
        method : 'PATCH',
        headers : {
              "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
    });
    return res.json()
}