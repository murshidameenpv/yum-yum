import menuDb from "../model/MenuSchema.js";

export const getAllMenu = async (req, res) => {
  try {
    const menus = await menuDb.find({}).sort({createdAt: -1});
    res.status(200).json({menus});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching menu items');
  }
};

  

//add menu
export const addMenuItems = async (req, res) => {
   const newItem = req.body;
      try {
       const result = await menuDb.create(newItem);
       res.status(201).json({message:"Item Added Successfully"});
      } catch (error) { 
        console.error(error);
        res.status(500).send('Error adding item to Database');
      }
};
    


// delete menu
export const deleteMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const deleteItem = await menuDb.findByIdAndDelete(menuId)
    if (!deleteItem) {
      return res.status(404).json({message:"Menu not Found"})
    }
    res.status(200).json({message:"Item Deleted Successfully"})
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Deleting item");
  }
}