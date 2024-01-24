import React from 'react'

function Cart() {
  return (
    <div className="section-container ">
      <div className="max-w-screen-2xl section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col  justify-center items-center gap-8">
          {/* texts */}
          <div className="space-y-7 px-5">
            <h2 className="md:text-5xl font-bold text-4xl md:leading-snug leading-snug">
              Items Add To Your <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>
      {/* table for cart */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='bg-green text-white rounded-xl'>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
             <td>1</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>

          </tbody>


        </table>
      </div>
    </div>
  );
}

export default Cart