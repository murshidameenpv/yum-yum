import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards';
import { FaFilter } from 'react-icons/fa'
function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  // console.log(selectedCategory,"ppppppppppppppp");
  const [sortOption, setSortOption] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  //loading data
  useEffect(() => {
    // hardcoded data
    const fetchData = async () => {
      try {
        const response = await fetch("/data/menu.json");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };
    //call the finction inside useEffect
    fetchData();
  }, []);
  //Filter data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  //Show all menu
  const showAllMenu = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };
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
    setCurrentPage(1);
  };
  //pagination logic
  //each page, you calculate the indices of the first and last items on that page. This is done with these lines of code :-
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItem = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between mb-8 items-center space-y-3">
          {/* all category btn  */}
          <div className="flex flex-row  items-start md:items-center  md:gap-8 gap-4 flex-wrap">
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
          {/* Sorting */}
          <div className="flex justify-end">
            <div className="bg-black p-2">
              <FaFilter className="h-4 w-4 text-white" />
            </div>
            {/* sorting options */}
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSorting(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-1 text-center text-sm  rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A - Z</option>
              <option value="Z-A">Z - A</option>
              <option value="low-to-high">Low - High</option>
              <option value="high-to-low">High - High</option>
            </select>
          </div>
        </div>
        {/* product cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItem.map((item, index) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* paginaton  */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu
// notes

   /* The Array.from method is a static method that creates a new array instance from an iterable object. Here it creates a new array with a length equal to the
        number of pages, which is calculated as Math.ceil(filteredItems.length /
        itemsPerPage). The map method then creates a new array of buttons, one
        for each page */

//  The underscore () here is a convention used by some developers to indicate that the parameter is not being used. The map function provides two parameters to the callback function: the current element and its index. In this case, you’re only using the index (to create the page numbers and set the key property of the buttons), so the underscore () is used for the first parameter to indicate that it’s not being used.