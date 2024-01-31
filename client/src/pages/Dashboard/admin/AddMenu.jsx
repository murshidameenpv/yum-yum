import React from 'react'
import { useForm } from 'react-hook-form';
import { MdRestaurantMenu } from "react-icons/md";
function AddMenu() {
    //image hosting api key
    const IMGBB_KEY = import.meta.env.VITE_IMGBB_APIKEY;
    console.log(IMGBB_KEY);

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
    } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
    }
  return (
    <div className="w-full md:w-[720px] px-4 mx-auto">
      <h2 className="font-bold text-2xl my-4">
        Upload a New <span className="text-green">Menu Item</span>{" "}
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
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Select a Category
                </option>
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
          <button className="btn bg-green text-white px-6">
            <MdRestaurantMenu />
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMenu