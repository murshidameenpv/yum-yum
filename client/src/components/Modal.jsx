import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
function Modal() {
  //register is the core api of this hook which allows us to register inpu fields to the formhook
  const { 
    register,
    handleSubmit,
  } = useForm();
  
  const { signUpWithGmail, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("")

  //redirecting to home or specific page
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location,"oooooooooooooo");
  const from = location.state?.from?.pathname || "/"

//login
  const onSubmit = (data) => {
    const { email, password } = data;
    //  console.log(email,password);
    login(email,password).then((result) => {
    // Signed in 
    const user = result.user;
      alert("Login Successf ul")
      document.getElementById("my_modal_5").close();
      navigate(from, { replace:true})
  })
  .catch((error) => {
    console.error(error);
    setErrorMessage("Provide a valid email and password");
  });
  } ;

  

  //google Login / signup 
  const handleLogin = () => {
    signUpWithGmail().then((result) => {
      const user = result.user;
      document.getElementById("my_modal_5").close();
      navigate(from, { replace: true });
      alert("Signup Successful")
    }).catch((error) => {
      // Handle Errors here.
      console.error(error);
    })
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
            {errorMessage && <p className="text-rose-800 text-sm italic">{errorMessage}</p>}
            {/* login button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>
            <p className="text-center my-2">
              Don&apos;t have an account ?
              <Link to="/signup" className="text-brown underline ml-1">
                Signup Now
              </Link>
            </p>
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
          {/* social signing */}
          <div className="text-center space-x-3 mb-3">
            <button className="btn btn-circle hover:bg-green hover:text-white"
            onClick={handleLogin}>
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
