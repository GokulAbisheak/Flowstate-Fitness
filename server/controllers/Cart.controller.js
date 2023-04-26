// import Cart from "../models/Cart.model.js";
// import mongoose from "mongoose";
// // import Product from "../models/Product.model.js";
// // import logger from "../utilities/logger.js";

// const CartController = {
//     // Get all items in cart for a specific user
//     getAllItems: async (req, res) => {
//       try {
//         const { email } = req.params;
//         const items = await Cart.find({ user: email });
//         res.json(items);
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Unable to get cart items' });
//       }
//     },
  
//     // Add an item to the cart for a specific user
//     createCartItem: async (req, res) => {
//         try {
//           const { user, productId } = req.body;
      
//           // Convert the user string to an ObjectId
//           const userId = mongoose.Types.ObjectId(user);
      
//           // Create the new cart item with the user and productId
//           const cartItem = await Cart.create({ user: userId, productId });
      
//           res.status(201).json({ success: true, data: cartItem });
//         } catch (error) {
//           console.warn(error);
//           res.status(400).json({ success: false, message: error.message });
//         }
//       },
  
//     // Remove an item from the cart for a specific user
//     removeItem: async (req, res) => {
//       try {
//         const { email, id } = req.params;
//         await Cart.findOneAndDelete({ _id: id, user: email });
//         res.json({ message: 'Item removed from cart successfully' });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Unable to remove item from cart' });
//       }
//     },
  
//     // Update the quantity of an item in the cart for a specific user
//     updateItemQuantity: async (req, res) => {
//       try {
//         const { email, id } = req.params;
//         const { quantity } = req.body;
//         await Cart.findOneAndUpdate({ _id: id, user: email }, { quantity });
//         res.json({ message: 'Item quantity updated successfully' });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Unable to update item quantity' });
//       }
//     },
  
//     // Empty the cart for a specific user
//     emptyCart: async (req, res) => {
//       try {
//         const { email } = req.params;
//         await Cart.deleteMany({ user: email });
//         res.json({ message: 'Cart emptied successfully' });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Unable to empty cart' });
//       }
//     }
//   };
  
//   export default CartController;