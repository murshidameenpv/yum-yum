import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
function Modal() {
  //register is the core api of this hook which allows us to register inpu fields to the formhook
  const { 
    register,
    handleSubmit,
  } = useForm();
  
  const { signUpWithGmail, login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("")
  //redirecting to home or specific page
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location,"oooooooooooooo");
  const from = location.state?.from?.pathname || "/"
  const axiosPublic = useAxiosPublic()

//login
  const onSubmit = (data) => {
    const { email, password } = data;
    //  console.log(email,password);
      login(email, password).then((result) => {
        const user = result.user;
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users").then((response) => {
          alert("Signing Successful ");
          navigate(from, { replace: true });
        });
      });
  } ;

  

  //google Login / signup 
   const handleRegister = () => {
     signUpWithGmail()
       .then((result) => {
         const user = result.user;
         const userInfo = {
           name: result?.user?.displayName,
           email: result?.user?.email,
         };
         axiosPublic
           .post("/users", userInfo)
           .then((response) => {
             alert("Successfully Created Account");
             navigate("/");
           });
       })
       .catch((error) => console.error(error));
   };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col justify-center">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please Login</h3>
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
            {/* Error Message */}
            {errorMessage && (
              <p className="text-rose-800 text-sm italic">{errorMessage}</p>
            )}
            {/* login button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>

            {/* if there is a button in form , it will close the modal also it will go to top right cornor */}
            <button
              type="button"
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div>
            <p className="text-center my-2">
              Don&apos;t have an account ?
              <Link to="/signup" className="underline text-brown ml-1">
                Signup Now
              </Link>
            </p>
          </div>
          {/* social signing */}
          <div className="text-center space-x-3 mb-3">
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
      </div>
    </dialog>
  );
}

export default Modal;
