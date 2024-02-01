import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
//This custom hook is used to fetch cart item of user using their email
function useCart() {
  const { user } = useAuth();
  const token = localStorage.getItem('access_token')
  const axiosPublic = useAxiosPublic()
  const { refetch,data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      try {
        const response = await axiosPublic.get(
          `/cart?email=${user?.email}`,
          {
            headers: {
              authorization: `Barer ${token}`
            },
          }
        );
        return response.data?.cart;
      } catch (error) {
        console.error(error);
        throw new Error("Network response was not ok");
      }
    },
  });
  return [cart ,refetch]
}

export default useCart;
