import cartDb from '../model/CartSchema.js'



  //All cart operations
 

    //get items from cart
export const getCartByEmail = async (req, res) => {
      try {
        const email = req.query.email;
        const query = { email }
        const cart = await cartDb.find(query).exec()
        res.status(201).json({ cart });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart items');
      }
};



   //posting cart item to db
export const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, price, quantity, image,email } = req.body;
  // console.log(menuItemId, name, price, quantity, image,"pppppppppppppppppp");
      try {
      const itemExistInCart = await cartDb.findOne({ menuItemId });
      if (itemExistInCart) {
        return res.json({ message: "Item already Exist in Cart" });
      }
      const cartItem = await cartDb.create({
        menuItemId,
        name,
        recipe,
        price,
        quantity,
        email,
        image,
      });
      res.status(201).json({ cartItem, insertedId: cartItem._id });
      } catch (error) { 
        console.error(error);
        res.status(500).send('Error adding item to cart');
      }
    };

    //delete items from cart 
  export const deleteFromCart =  async (req, res) => {
    const cartId = req.params.id
    console.log(cartId,"this is cartid");
    try {
      const deleteItem = await cartDb.findByIdAndDelete(cartId)
      if (!deleteItem) {
        return res
          .status(401)
          .json({
            message: "Cart Item is not found",
            icons: "error",
            title: "Error!",
          });
      }
      res.status(201).json({
        message: "Deleted Successfully",
        success: "success",
        title: "Deleted!"
      })
      } catch (error) {
        console.error(error);
        res.status(500).send('Error removing item from cart')
      }
    }

    //update cart quantitiy
export const updateCartQuantity = async (req, res) => {
  const cartId = req.params.id;
  const {quantity} = req.body;
       try {
          const updateCart = await cartDb.findByIdAndUpdate(cartId, {quantity}, { new: true, runValidators: true });
         if (!updateCart) {
           return res.status(401).json({message:"Cart Item Not found"})
         }
        //  console.log(updateCart,"Updated cart");
         return res.status(201).json({updateCart})

      } catch (error) {
        console.error(error);
        res.status(500).send('Error updating cart')
    }
}

//get single cart by id
export const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
     const cartItem = await cartDb.findById(cartId)
    return res.status(201).json({cartItem});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting  cart");
  }
};