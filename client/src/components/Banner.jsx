import React from 'react'

function Banner() {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        {/* images */}
        <div className="md:w-1/2">
          <img src="/home/banner.png" alt="banner" />
          <div className="flex flex-col md:flex-row justify-around items-center -mt-16       gap-10">
            <div className="flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
              <img src="/home/b-food1.png" alt="img" className="rounded-2xl" />
              <div className="space-y-1">
                <h5 className="font-medium mb-1">Spicy Noodles</h5>
                <div className="rating rating-xs">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500" readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500" readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500" readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500" readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500" readOnly
                  />
                </div>
                <p className="text-amber-900">$17.99</p>
              </div>
            </div>
            <div className="sm:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
              <img src="/home/b-food1.png" alt="img" className="rounded-2xl" />
              <div className="space-y-1">
                <h5 className="font-medium mb-1">Spicy Noodles</h5>
                <div className="rating rating-xs">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500" readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500" readOnly
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500" readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500" readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-500" readOnly
                  />
                </div>
                <p className="text-amber-900">$20.99</p>
              </div>
            </div>
          </div>
        </div>
        {/* texts */}
        <div className="md:w-1/2 space-y-7 px-5">
          <h2 className="md:text-5xl font-bold text-4xl md:leading-snug leading-snug">
            Discover the Wonderland of Delectable{" "}
            <span className="text-green">Dishes</span>
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Every Plate is a Symphony of Culinary Innovation and Masterful
            Craftsmanship
          </p>
          <button className="btn bg-green text-white px-3 py-3 rounded-full font-semibold">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner