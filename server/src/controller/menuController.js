import menuDb from "../model/MenuSchema.js";

//get all menu
 export const getAllMenu = async (req, res) => {
    try {
        const menus = await menuDb.find({})
        res.status(201).json({menus})
    } catch (error) {
         console.error(error); 
        res.status(500).send('Error fetching menu items');
      }
}
  

//add menu
export const addMenuItems = async (req, res) => {
   const newItem = req.body;
      try {
       const result = await menuDb.create(newItem);
       res.status(200).json(result);
      } catch (error) { 
        console.error(error);
        res.status(500).send('Error adding item to cart');
      }
};
    