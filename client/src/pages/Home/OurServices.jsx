import React from 'react'

function OurServices() {
    const services = [
      {
        id: 1,
        title: "Catering",
        description: "Delight your guest with our flavours and presentation",
        image: "/home/services/cooking.png",
      },
      {
        id: 2,
        title: "Fast Delivery",
        description: "We deliver your order promptly to your door",
        image: "/home/services/clock.png",
      },
      {
        id: 3,
        title: "Online Ordering",
        description: "Explore menu and order with ease using our Online Ordering",
        image: "/home/services/online-shop.png",
      },
      {
        id: 4,
        title: "Gift Cards",
        description: "Give the gift of exceptional dining with YumYum gift cards",
        image: "/home/services/gift-card.png",
      },
    ];
  return (
    <div className="section-container my-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text */}
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">our story & services</p>
            <h2 className="title">Our Culinary Journey And Services</h2>
            <p className="my-5 text-yellow-600 leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services,blending culinary artistry with warm
              hospitality.
            </p>
            <button className="btn text-white bg-green py-3 px-8 rounded-full">
              Explore
            </button>
          </div>
        </div>
        {/* images */}
        <div className="md:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {services.map((service) => (
              <div
                key={service.id}
                className="shadow-md rounded-sm py-5 px-4 space-y-2 text-center text-brown cursor-pointer hover:border-slate-900 transition-all duration-200 hover:border"
              >
                <img src={service.image} alt="img" className="mx-auto" />
                <h5 className="pt-3 font-semibold">{service.title}</h5>
                <p className="text-brown">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurServices