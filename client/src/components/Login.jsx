import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
function Login() {
  const { signUpWithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname || "/";
  const [errorMessage, setErrorMessage] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //login
  const onSubmit = async (data) => {
    try {
      await axiosPublic.get("/users/login", {
        params: { email: data.email },
      });
      // User found in your database
      const result = await login(data.email, data.password);
      console.log(result, "Firebase login result");
      alert("Signing Successful");
      navigate(from, { replace: true });
      reset();
      document.getElementById("my_modal_5").close();
      setErrorMessage("");
    } catch (error) {
      console.log(error, "Error logging in");
      setErrorMessage(error?.response?.data?.message);
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
      alert("Signing Successful");
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg">Please Login!</h3>

          {/* email */}
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
              {...register("password", { required: true })}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2">
                Forgot password?
              </a>
            </label>
          </div>

          {/* show errors */}
          {errorMessage && (
            <p className="text-rose-800 text-sm italic">{errorMessage}</p>
          )}
          {/* submit btn */}
          <div className="form-control mt-4">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Login"
            />
          </div>

          {/* close btn */}
          <Link to="/">
            <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </div>
          </Link>

          <p className="text-center my-2">
            Donot have an account?
            <Link to="/signup" className="underline text-brown ml-1">
              Signup Now
            </Link>
          </p>
        </form>
        <div className="text-center space-x-3">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
