
import { getAllUsers } from '@/lib/api/users';
import React from 'react';

const UserManagement = async () => {

     const AllUsers = await getAllUsers();
     console.log("AllUsers",AllUsers);
     

    return (
        <div>
            <h1>this is usermanagment </h1>
        </div>
    );
};

export default UserManagement;