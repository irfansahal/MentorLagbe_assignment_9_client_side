
import { getAdminOverveiw } from '@/lib/api/overveiw';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { CheckCircle2, Clock, Crown, Send } from 'lucide-react';
import { headers } from 'next/headers';
import React from 'react';

const AdminDashboard = async () => {
    
    // const { data , error } = await authClient.token();
    
    // const tokenData = await auth.api.getToken({
    //     headers : await headers()
    // })
    
    
    const session = await auth.api.getSession({
        headers : await headers()
    });

    // console.log("token", tokenData?.token, session?.user , session?.session.token);
    // console.log("Token error:");
    

    const user = session?.user

     const overview = await getAdminOverveiw();
     console.log("overview",overview);
     
    return (
       <div className="flex flex-col gap-6 px-10">

            {/* Welcome div */}
            <div className="flex items-center justify-between rounded-2xl bg-violet-100 p-8 dark:bg-violet-500/15">
                <div>
                    <h2 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Here&apos;s your dashboard overview.</p>
                </div>
                <span className="text-5xl">🎓</span>
            </div>

            {/* Four cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-violet-500/10">
                         <CheckCircle2 className="size-5 text-violet-600" />
                    </span>
                    <p className="mt-4 text-3xl font-bold">{overview?.totalUsers}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <span className="absolute -bottom-6 -right-6 size-24 rounded-full bg-violet-500/20" />
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2 className="size-5 text-green-600" />
                    </span>
                    <p className="mt-4 text-3xl font-bold">{overview?.totalTutor}</p>
                    <p className="text-sm text-muted-foreground">Total Tutor</p>
                    <span className="absolute -bottom-6 -right-6 size-24 rounded-full bg-green-500/20" />
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-orange-500/10">
                        <Clock className="size-5 text-orange-600" />
                    </span>
                    <p className="mt-4 text-3xl font-bold">{overview?.totalRev}</p>
                    <p className="text-sm text-muted-foreground">Total Stripe Revenue</p>
                    <span className="absolute -bottom-6 -right-6 size-24 rounded-full bg-orange-500/20" />
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-violet-500/10">
                        <Crown className="size-5 text-violet-600" />
                    </span>
                    <p className="mt-4 text-lg font-bold">{overview?.pendingTuitionsVsApprovedTuitions}</p>
                    <p className="text-sm text-muted-foreground">Pending vs. Approved Tuitions</p>
                    <span className="absolute -bottom-6 -right-6 size-24 rounded-full bg-violet-500/20" />
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;