
import { getTuitions } from '@/lib/api/tuitions';
import { auth } from '@/lib/auth';
import { Tuition } from '@/lib/actions/tuitions';
import { headers } from 'next/headers';
import React from 'react';
import MyTuitionTable from '../../../components/dashboard/tutor/MyTuitionTable';
import { TuitionType } from '@/app/components/dashboard/tutor/EditDialog';

const MyTuition = async () => {

     const session = await auth.api.getSession({
        headers : await headers()
     });

     const userId = session?.user?.id

     const result = await getTuitions(userId ?? null)
     const tuitions: TuitionType[] = Array.isArray(result) ? result : result?.data ?? []

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold text-center">My Tuitions</h1>
            <div className='px-10'>
                <MyTuitionTable tuitions={tuitions} />
            </div>
        </div>
    );
};

export default MyTuition;
