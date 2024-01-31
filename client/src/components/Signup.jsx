import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
});

function Signup() {
  const { createUser, signUpWithGmail } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = React.useState("");

  //register is the core api of this hook which allows us to register inpu fields to the formhook
  const { register,handleSubmit,formState: { errors },reset,} = useForm({
    resolver: yupResolver(schema),
  });

  //redirecting to home or specific page
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password, name } = data;

    try {
      const result = await createUser(email, password);
      console.log(result,"llllllllllllllllll");
      if (result.user) {
        const userInfo = { email: result.user.email, name: name };
        await axiosPublic.post("/users", userInfo);
        alert("Successfully Created Account");
        navigate("/");
        reset();
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
       setErrorMessage("Error Occurred, Please Try again"); // Set the error message
       reset();
    }
  };

  const handleRegister = async () => {
    try {
      const result = await signUpWithGmail();
      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
      };
      await axiosPublic.post("/users", userInfo);
      alert("Successfully Created Account");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-lg bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action mt-0 flex flex-col justify-center">
        <form
          className="card-body w-[400px]"
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
            {errors.name && (
              <p className="text-rose-950 italic my-1">
                {errors.name?.message}
              </p>
            )}
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
            {errors.email && (
              <p className="text-rose-950 italic my-1">
                {errors.email?.message}
              </p>
            )}
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
            {errors.password && (
              <p className="text-rose-950 italic my-1">
                {errors.password?.message}
              </p>
            )}
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div>
            {errorMessage && <p className="text-rose-900">{errorMessage}</p>}
          </div>
          {/* signup button */}
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
