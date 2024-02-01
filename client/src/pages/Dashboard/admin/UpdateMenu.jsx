import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdRestaurantMenu } from "react-icons/md";

function UpdateMenu() {
  const item = useLoaderData();
  console.log(item, "llllllllllllllll");
  //image hosting api key
  const IMGBB_APKEY = import.meta.env.VITE_IMGBB_APIKEY;
  // console.log(IMGBB_APKEY);
  const IMGBB_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_APKEY}`;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageData = new FormData();
      imageData.append("image", data.image[0]);

      const result = await axiosPublic.post(IMGBB_URL, imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data.success) {
        const menuItem = {
          name: data.name,
          recipe: data.recipe,
          image: result.data?.data?.display_url,
          category: data.category,
          price: parseFloat(data.price),
        };

        const updateMenu = await axiosSecure.patch(`/menu/${item._id}`, menuItem);
        console.log(updateMenu,"ooooooooooo");
        if (updateMenu.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: updateMenu.data.message,
            showConfirmButton: true,
            confirmButtonColor: "#495e57",
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Updating menu",
        text: error.message,
        showConfirmButton: true,
        confirmButtonColor: "#495e57",
      });
      setLoading(false);
      reset();
    } finally {
      setLoading(false);
      reset();
    }
  };
  return (
    <div className="w-full md:w-[720px] px-4 mx-auto">
      <h2 className="font-bold text-2xl my-4">
        Update This <span className="text-green">Menu Item</span>{" "}
      </h2>
      {/* form input  */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              {...register("name", { required: true })}
              defaultValue={item.name}
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>
          {/* second row */}
          <div className="flex items-center gap-4">
            {/* category */}
            <div className="form-control w-full max-w-xs my-6">
              <div className="label">
                <span className="label-text">Choose Category*</span>
              </div>
              <select
                className="select select-bordered"
                {...register("category")}
                defaultValue={item.category}
              >
                <option value={"salad"}>Salad</option>
                <option value={"pizza"}>Pizza</option>
                <option value={"soup"}>Soup</option>
                <option value={"desserts"}>Deserts</option>
                <option value={"drinks"}>Drinks</option>
                <option value={"popular"}>Popular</option>
              </select>
            </div>
            {/* prices */}
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                defaultValue={item.price}
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* third row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
                      <textarea
                      defaultValue={item.recipe}
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Write Description about Recipe"
            ></textarea>
          </div>
          {/* 4th row */}
          <div className="form-control w-full max-w-xs my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
          {loading ? (
            <div className="loader">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <button className="btn bg-green text-white px-6">
              <MdRestaurantMenu />
              Add Item
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default UpdateMenu;
