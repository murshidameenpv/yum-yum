import React, { useContext, useState } from 'react'
import useCart from '../../hooks/useCart';
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2';
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthProvider';
import { IoMdAdd, } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
function Cart() {
  const [cart, refetch] = useCart()
  const { user, isAuthenticated } = useContext(AuthContext)
  const [cartItems, setCartItems] = useState([])
  const axiosPublic = useAxiosPublic()
  // console.log(cart,"cart items in cart page");
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#495e57",
      cancelButtonColor: "#952323",
      confirmButtonText: "Yes, Remove From Cart!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(
           `/cart/${item._id}`
          );
          
          const data = response.data;
          // console.log(data,"delete cart item");
          if (data) {
            Swal.fire({
              title: data.title,
              text: data.message,
              icon: data.icon,
              confirmButtonColor: "#495e57",
            });
            refetch(); // Refetch the cart items,it will update the cart items comes fro custom hook
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "There was an error removing the item from the cart.",
            icon: "error",
            confirmButtonColor: "#495e57",
          });
        }
      }
    });
  };
  const handleDecreaseQuantity = async (item) => {
  try {
    // console.log(item._id,'ooooo');
    const response = await axios.put(`http://localhost:3000/cart/${item._id}`, {
      quantity: item.quantity - 1,
    });
    const updatedCart = cartItems.map((cartItem) => { 
      if (cartItem.id === item.id) {
        return {
          ...cartItem,quantity:cartItem.quantity - 1
        }
      }
        return cartItem;
    })
    refetch()
    setCartItems(updatedCart)
    // const data = response.data;
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
  };

  const handleIncreaseQuantity = async (item) => {
  try {
    const response = await axios.put(`http://localhost:3000/cart/${item._id}`, {
      quantity: item.quantity + 1,
    });
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      refetch();
      setCartItems(updatedCart);
    // const data = response.data;
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
  };
//Calculate total price (quantity * price of item)
  const calculatePrice = (item) => {
    return item.price * item.quantity
  }
  //Calculate sub total
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item)
  },0)
  

  return (
    <div className="section-container">
      <div className="max-w-screen-2xl section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col  justify-center items-center gap-8">
          {/* texts */}
          <div className="space-y-7 px-5">
            <h2 className="md:text-5xl font-bold text-4xl md:leading-snug leading-snug">
              Items Add To Your <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>
      {cart.length === 0 || !cart ? (
        <div className="flex justify-center items-center">
          <img src="/empty.png" alt="emptycart" className="w-96" />
        </div>
      ) : (
        <>
          {/* table for cart */}
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white rounded-xl">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-extrabold">{item.name}</td>
                    <td className="font-extrabold">
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecreaseQuantity(item)}
                        disabled={item.quantity <= 1}
                      >
                        <RiSubtractFill />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                        readOnly
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        <IoMdAdd />
                      </button>
                    </td>
                    <td className="font-extrabold">{`$ ${calculatePrice(
                      item
                    ).toFixed(2)}`}</td>
                    <th>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash className="text-rose-700" />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* customer details. */}
          <div className="my-12 flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 space-y-4">
              <h3 className="font-bold">Customer Details</h3>
              <p className="font-semibold">Name :{user.displayName}</p>
              <p className="font-semibold">Email :{user.email}</p>
              <p className="font-semibold">User Id : {user.uid}</p>
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="font-bold">Shipping Details</h3>
              <p className="font-semibold">Total Items : {cart.length}</p>
              <p className="font-semibold">
                {`Total Price : ${cartSubTotal.toFixed(2)}`}
              </p>
              <Link to="/proceed-checkout" className="bg-green btn text-white">
                Proceed To Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart