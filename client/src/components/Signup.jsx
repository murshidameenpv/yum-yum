import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

function Signup() {
  //register is the core api of this hook which allows us to register inpu fields to the formhook
  const { register, handleSubmit } = useForm();

  const { createUser, signUpWithGmail, updateUserProfile } =
    useContext(AuthContext);

  //redirecting to home or specific page
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Signed up
  const onSubmit = (data) => {
    // console.log(data)
    const { email, password } = data;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.email, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email:data.email
            }
            axios
              .post("http://localhost:3000/users", userInfo)
              .then((response) => {
                alert("Successfully Created Account");
                navigate(from, { replace: true });
              });
        })
       
      })
      .catch((error) => {
        console.error(error);
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
        axios.post("http://localhost:3000/users",userInfo)
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
