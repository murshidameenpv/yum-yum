import menuDb from "../model/MenuSchema.js";

//get all menu
 export const getAllMenu = async (req, res) => {
    try {
        const menus = await menuDb.find({})
        console.log(menus,"kkkkkkkkkkkarrrtt");
        res.status(201).json({menus})
    } catch (error) {
         console.error(error);
        res.status(500).send('Error fetching menu items');
      }
}
  

//add menu
const addMenuItems = async (req, res) => {
      try {
       
      } catch (error) { 
        console.error(error);
        res.status(500).send('Error adding item to cart');
      }
};
    

  //All cart operations
    //posting cart item to db
const addToCart = async (req, res) => {
      try {
      
      } catch (error) { 
        console.error(error);
        res.status(500).send('Error adding item to cart');
      }
    };

    //get items from cart
const getItemsFromCart = async (req, res) => {
      try {
      
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart items');
      }
    };


    //get specific cart
const getUserCart = async (req, res) => {
      try {
       
        res.status(201).send(result)
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart')
      }
    }

    //delete items from cart 
   const deleteFromCart =  async (req, res) => {
      try {
       
      } catch (error) {
        console.error(error);
        res.status(500).send('Error removing item from cart')
      }
    }

    //update cart quantitiy
    const updateCartQuantity = async (req, res) => {
       try {
          


      } catch (error) {
        console.error(error);
        res.status(500).send('Error updating cart')
    }
}
