import React, { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

function ManageItems() {
    const [menus, loading, refetch] = useMenu();
    const axiosPublic = useAxiosPublic()
  // console.log(menus, "nnnnnnnnnnnnnnnnn");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  //pagination logic
  //each page, you calculate the indices of the first and last items on that page. This is done with these lines of code :-
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItem = menus.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
const handleDeleteItem = (menu) => {
  Swal.fire({
    title: "Delete Item!",
    text: "Are you sure you want to delete this menu?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#495e57",
    cancelButtonColor: "#952323",
    confirmButtonText: "Yes, delete it!",
  }).then( async (result) => {
    if (result.isConfirmed) {
     await axiosPublic
        .delete(`/menu/${menu._id}`)
        .then((response) => {
          showSuccessAlert(response.data.message);
          refetch()
        })
        .catch((error) => {
          console.error(error);
          showErrorAlert()
        });
    }
  });
    };
      const showSuccessAlert = (message) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: message,
          showConfirmButton: true,
          confirmButtonColor: "#495e57",
        });
      };
      const showErrorAlert = () => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error Deleting Item",
          showConfirmButton: true,
          confirmButtonColor: "#495e57",
        });
      };
  return (
    <div className="w-full md:w-[720px] px-4 mx-auto">
      <h2 className="font-bold text-2xl my-4">
        Manage All<span className="text-green">Menu Items</span>{" "}
      </h2>
      {/* menu item table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {currentItem.map((menu, index) => (
              <tr key={index}>
                <th>{indexOfFirstItem + index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={menu.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{menu.name}</td>
                <td>{`$ ${menu.price}`}</td>
                <td>
                  <Link to={`/admin/update-menu/${menu._id}`}>
                    <button>
                      <FaEdit className="text-xl" />
                    </button>
                  </Link>
                </td>
                <td>
                  <button onClick={()=>handleDeleteItem(menu)} className="btn btn-ghost btn-xs">
                    <MdDelete className="text-xl"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* paginaton  */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(menus.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ManageItems;

// notes

/* The Array.from method is a static method that creates a new array instance from an iterable object. Here it creates a new array with a length equal to the
        number of pages, which is calculated as Math.ceil(menus.length /
        itemsPerPage). The map method then creates a new array of buttons, one
        for each page */

//  The underscore () here is a convention used by some developers to indicate that the parameter is not being used. The map function provides two parameters to the callback function: the current element and its index. In this case, you’re only using the index (to create the page numbers and set the key property of the buttons), so the underscore () is used for the first parameter to indicate that it’s not being used.
