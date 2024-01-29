import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import useAxiosSecure from '../../../hooks/useAxiosSecure';


function Users() {
  const axiosSecure = useAxiosSecure()
   const { refetch, data: users = [] } = useQuery({
     queryKey: ["users"],
     queryFn: async () => {
       try {
         const response = await axiosSecure.get('/users')
         return response.data;
       } catch (error) {
         console.error(error);
         throw new Error("Network response was not ok");
       }
     },
   });
  // console.log(users)
  const handleMakeAdmin =  (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((response) => {
      alert(`${user.name} is now Admin`)
      refetch()
    })
    
  }
   const handleDeleteUser = (user) => {
     axiosSecure.delete(`/users/${user._id}`).then((response) => {
       alert(`${user.name} is deleted`);
       refetch();
     });
   };
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Users</h5>
        <h5>Total Users : {users.length}</h5>
      </div>
      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rounded-">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index+1}</th>
                  <td>{ user.name}</td>
                  <td>{ user.email}</td>
                  <td>
                    { 
                    user.role  === 'admin' ? ('Admin') : (<button  onClick={()=>handleMakeAdmin(user)} className='btn btn-circle'><FaRegUser/></button>)
                  }
                  </td>
                  <td><button onClick={()=>handleDeleteUser(user)}><MdDelete/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users