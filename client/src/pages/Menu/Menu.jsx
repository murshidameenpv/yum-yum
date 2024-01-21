import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards';

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  console.log(selectedCategory,"ppppppppppppppp");
  const [sortOption, setSortOption] = useState("default")
  //loading data
  useEffect(() => {
    // hardcoded data
    const fetchData = async () => {
      try {
        const response = await fetch("/data/menu.json");
        const data = await response.json()
        // console.log(data);
        setMenu(data)
        setFilteredItems(data)
      } catch(error) {
        console.error("Error Fetching Data", error);
      }
    }
    //call the finction inside useEffect
    fetchData()
  },[])
  //Filter data based on category
  const filterItems = (category) => {
    const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category)
  }
  //Show all menu
  const showAllMenu = () => {
    setFilteredItems(menu)
    setSelectedCategory("all")
  }
  //Sorting based on A -Z,Z-A,pricing
  const handleSorting = (option) => {
    setSortOption(option);
    //Dont mutate original array so i created a copy of the array using ... spread  ( arrays are reference types)
    let sortedItems = [...filteredItems];
    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
  }
  return (
    <div>
      {/* Menu bannar */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-24 flex flex-col justify-center items-center gap-8">
          {/* texts */}
          <div className="space-y-7 px-5 text-center">
            <h2 className="md:text-5xl font-bold text-4xl md:leading-snug leading-snug">
              For The Love Of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto">
              Come with family & feel the joy of mouth watering food such as
              Greek Salad, Lasagna , Wagyu Steak, Cruncy Frys and more for a
              moderate cost
            </p>
            <button className="btn bg-green text-white px-3 py-3 rounded-full font-semibold">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* menu  shop section */}
      <div className="section-container">
        {/* filtering and Sorting */}
        <div className="flex flex-row  items-start md:items-center my-2 mx-3 py-2 md:gap-8 gap-4 flex-wrap">
          {/* all category btn  */}
          <button
            onClick={showAllMenu}
            className={selectedCategory === "all" ? "active" : ""}
          >
            All
          </button>
          <button
            onClick={() => filterItems("salad")}
            className={selectedCategory === "salad" ? "active" : ""}
          >
            Salad
          </button>
          <button
            onClick={() => filterItems("pizza")}
            className={selectedCategory === "pizza" ? "active" : ""}
          >
            Pizza
          </button>
          <button
            onClick={() => filterItems("soup")}
            className={selectedCategory === "soup" ? "active" : ""}
          >
            Soups
          </button>
          <button
            onClick={() => filterItems("dessert")}
            className={selectedCategory === "dessert" ? "active" : ""}
          >
            Desserts
          </button>
          <button
            onClick={() => filterItems("drinks")}
            className={selectedCategory === "drinks" ? "active" : ""}
          >
            Drinks
          </button>
        </div>
        {/* product cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {filteredItems.map((item, index) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu