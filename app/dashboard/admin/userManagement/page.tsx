
import { getAllUsers } from '@/lib/api/users';
import React from 'react';
import RoleSelect from '@/app/components/dashboard/admin/RoleSelect';

type UserType = {
    _id: string,
    name: string,
    email: string,
    image?: string,
    role?: string,
    subscription?: string,
    createdAt?: string
}

const UserManagement = async () => {

     const users = await getAllUsers();

     const AllUsers: UserType[] = Array.isArray(users.result) ? users.result : []

     console.log("users",users.result);
     
    return (
        <div className="px-10">
            <h1 className="mb-4 text-xl font-semibold">User Management</h1>

            <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[900px] border-collapse text-sm">
                    <thead>
                        <tr className="bg-[#fbad06] text-left text-xs font-semibold uppercase tracking-wide text-black">
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Existing Role</th>
                            <th className="px-4 py-3">Subscription</th>
                            <th className="px-4 py-3">Registared At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AllUsers.map((user) => (
                            <tr
                                key={user._id}
                                className="border-b border-border last:border-b-0 even:bg-muted/50"
                            >
                                <td className="px-4 py-3">
                                    {user.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="size-10 rounded-full border border-border object-cover"
                                        />
                                    ) : (
                                        <span className="flex size-10 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
                                            N/A
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-3">{user.name}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">{user.role}</td>
                                <td className="px-4 py-3">
                                    <RoleSelect userId={user._id}/>
                                </td>

                                <td className="px-4 py-3">{user.subscription || "Free"}</td>
                                <td className="px-4 py-3">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                </td>
                            </tr>
                        ))}

                        {AllUsers.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-sm text-muted-foreground">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
