import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'
import { AuthContext } from '../contexts/AuthProvider';
import axios from "axios";
import Swal from "sweetalert2";
import useCart from '../hooks/useCart';

function Cards({ item }) {
  const { user, isAuthenticated } = useContext(AuthContext)
  const [cart, refetch] = useCart();
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(user);


  const handleAddToCart = (item) => {
    if (!isAuthenticated || !user || !user.email) {
      showSignUpAlert();
      return;
    }
    const cartItems = createCartItem(item, user.email);

    axios
      .post("http://localhost:3000/cart", cartItems)
      .then(handleSuccessfulResponse)
      .catch(console.error);
  };

  const createCartItem = (item, email) => ({
    menuItemId: item._id,
    name: item.name,
    quantity: 1,
    image: item.image,
    price: item.price,
    email,
  });

  const handleSuccessfulResponse = (response) => {
    const data = response.data;

    if (data.message) {
      showInfoAlert(data.message);
    } else if (data.cartItem) {
      showSuccessAlert("Item added to Cart!");
    }

    refetch();
  };

  const showInfoAlert = (message) => {
    Swal.fire({
      position: "center",
      icon: "info",
      title: message,
      showConfirmButton: true,
      confirmButtonColor: "#495e57",
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

  const showSignUpAlert = () => {
    Swal.fire({
      title: "Please Sign Up",
      text: "You need to be signed in to add items to your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#495e57",
      cancelButtonColor: "#952323",
      confirmButtonText: "Sign Up",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/signup", { state: { from: location } });
      }
    });
  };


  
  const [isHeartFilled, setHeartFilled] = useState(false)
    const handleHeartClicked = () => {
        setHeartFilled(!isHeartFilled)
    }
  return (
    <div className="card shadow-lg bg-base-100  rounded-lg relative  px-1">
      <div
        className={`rating gap-1 absolute right-1 top-0 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-600" : "text-white"
        }`}
        onClick={handleHeartClicked}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link
        to={`/menu/${item._id}`}
        className="hover:scale-105 transition-all duration-200 md:h-72"
      >
        <figure>
          <img src={item.image} alt="card" />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold ">
            <span className="text-brown text-sm">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards