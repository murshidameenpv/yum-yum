import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//This custom hook is used to fetch cart item of user using their email
function useCart() {
  const { user } = useContext(AuthContext);
  const { refetch,data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/cart?email=${user?.email}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Network response was not ok");
      }
    },
  });
  return [cart ,refetch]
}

export default useCart;
