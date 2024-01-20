import React from 'react'

function Categories() {
    const categoryItems = [
        {
            id: 1,
            title: "Main Dish",
            description: "(86 dishes)",
            image:'/home/category/img1.png'
        },
        {
            id: 2,
            title: "Break Fast",
            description: "(12 dishes)",
            image:'/home/category/img2.png'
        },
        {
            id: 1,
            title: "Dessert",
            description: "(20 dishes)",
            image:'/home/category/img3.png'
        },
        {
            id: 1,
            title: "Browse All",
            description: "(300 dishes)",
            image:'/home/category/img3.png'
        },
    ]
  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Popular Categories</h2>
      </div>
      {/* Categories cards */}
      <div className="flex flex-col sm:flex-row items-center justify-around mt-12 gap-8">
        {categoryItems.map((item, index) => (
          <div key={index} className='shadow-lg rounded-lg px-6 py-6 bg-white w-72 mx-auto text-center cursor-pointer hover:translate-y-4 duration-300 transition-all'>
            <div className='flex mx-auto w-full justify-center items-center'>
              <img
                src={item.image}
                alt="item"
                className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28"
              />
            </div>
            <div className="mt-5 space-y-1">
                    <h5> {item.title}</h5>
                    <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories