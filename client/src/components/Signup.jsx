import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

function Signup() {
  //register is the core api of this hook which allows us to register inpu fields to the formhook
  const { register, handleSubmit } = useForm();
 const { createUser, signUpWithGmail, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic()

  //redirecting to home or specific page
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

const onSubmit = (data) => {
  const { email, password, name } = data;

  createUser(email, password)
    .then((result) => {
      if (result.user && result.user.email) {
        const userInfo = { email: result.user.email, name: name };
        console.log(userInfo,'user inffoooooooo');
        axiosPublic
          .post("/users", userInfo)
          .then((response) => {
            console.log(response.data);
            alert("Signup successful!");
            navigate("/");
          })
          .catch((error) => {
            console.error("Error posting user data:", error);
          });
      } else {
        console.error("User creation unsuccessful, no email found.");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
    });
};
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user
          console.log(user,"------------");
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users",userInfo)
          .then((response) => {
           alert("Successfully Created Account");
          navigate('/')
          });
      })
      .catch((error) => console.error(error))
  }
  return (
    <div className="max-w-lg bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action mt-0 flex flex-col justify-center">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg">Create an Account</h3>
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>
          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green text-white"
            />
          </div>
          <p className="text-center my-2">
            Have an account ?
            <Link to="/login">
              <button className="ml-2 underline text-brown">Login here</button>
            </Link>
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
        {/* social signing */}
        <div className="text-center space-x-3 mb-5">
          <button
            className="btn btn-circle hover:bg-green hover:text-white"
            onClick={handleRegister}
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebook />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
}

export default Signup;
