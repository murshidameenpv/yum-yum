import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

function useMenu() {
    const axiosPublic = useAxiosPublic()
    const { data: menus = [], isPending:loading, refetch } =
        useQuery({
            queryKey: ["menus"], queryFn: async () => {
              const response = await axiosPublic.get("/menu");
                return response.data.menus
            } });

   return [menus,loading,refetch]
  
}

export default useMenu