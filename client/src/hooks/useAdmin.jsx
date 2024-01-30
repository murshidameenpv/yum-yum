import React from 'react'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
function useAdmin() {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
     const { refetch, data: isAdmin , isPending:isAdminLoading} = useQuery({
       queryKey: [user?.email,'isAdmin'],
       queryFn: async () => {
         try {
             const response = await axiosSecure.get(`/users/admin/${user?.email}`)
           console.log(response.data?.admin, "ppppppppppppppppp");
            return response.data?.admin;
         } catch (error) {
           console.error(error);
           throw new Error("Network response was not ok");
         }
       },
     });
  return (
    [isAdmin,isAdminLoading]
  )
}

export default useAdmin;