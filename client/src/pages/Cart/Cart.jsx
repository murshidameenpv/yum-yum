import React from 'react'
import useCart from '../../hooks/useCart';
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2';
import axios from 'axios'

function Cart() {
  const [cart, refetch] = useCart()
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
      // Make this function async
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/cart/${item._id}`
          );
          const data = response.data;
          console.log(data,"delete cart item");
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
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

  return (
    <div className="section-container ">
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
                <td className="font-extrabold">{item.quantity}</td>
                <td className="font-extrabold">{`$ ${item.price}`}</td>
                <th>
                  <button className="btn btn-ghost btn-xs" onClick={()=>handleDelete(item)}>
                    <FaTrash className="text-rose-700" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart