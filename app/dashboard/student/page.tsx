

import { getStudentOverveiw } from '@/lib/api/overveiw';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const StundentDashboard = async () => {

     const session = await auth.api.getSession({
        headers : await headers()
     });

     const user = session?.user

     const studetnOverview = await getStudentOverveiw(user?.id)
    
     console.log("studetnOverview", studetnOverview);
     
    return (
        <div>
            <h1>This Student Dashboard</h1>
        </div>
    );
};

export default StundentDashboard;