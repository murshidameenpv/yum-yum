import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'
import { AuthContext } from '../contexts/AuthProvider';
import axios from "axios";

function Cards({ item }) {
  const {_id,name,recipe,image,price} = item
  const { user } = useContext(AuthContext)
  // console.log(user);
  //Add to cart function

const handleAddToCart = (item) => {
  // console.log(item);
  if (user && user?.email) {
    const cartItems = {
      menuItemId: _id,
      name,
      quantity: 1,
      image,
      price,
      email: user.email,
    };
    // console.log(cartItems);
    axios
      .post("http://localhost:3000/cart", cartItems)
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.error("Error Fetching Data", error);
      });
  }
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