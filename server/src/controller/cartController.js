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


    //get specific cart
export const getUserCart = async (req, res) => {
  try {
    
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart')
      }
    }

   //posting cart item to db
export const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, price, quantity, image } = req.body;
  console.log(menuItemId, name, price, quantity, image,"pppppppppppppppppp");
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
      try {
       
      } catch (error) {
        console.error(error);
        res.status(500).send('Error removing item from cart')
      }
    }

    //update cart quantitiy
    export const updateCartQuantity = async (req, res) => {
       try {
          


      } catch (error) {
        console.error(error);
        res.status(500).send('Error updating cart')
    }
}
