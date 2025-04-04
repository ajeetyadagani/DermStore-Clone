const express = require("express");
const {CartModel} = require("../models/cart.model");
const {UserModel} = require("../models/user.model");

const cartRouter = express.Router();

//to get cart data url
cartRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartdata = await UserModel.find({
      _id: userId,
    });
    res.status(200).send(cartdata);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

cartRouter.get("/", (req, res) => {
  res.send({ message: "Please wait" });
});

//post item to cart
cartRouter.post("/", async (req, res) => {
  try {
    const getdata = req.body;
    const cartdata = CartModel(getdata);
    await cartdata.save();
    res.status(200).send(cartdata);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//for increase the count of item
// cart.patch('/inc/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id)
//         const cartdata = await CartModel.findOneAndUpdate({ _id: id }, { $inc: { quantity: 1 } }, { new: true });
//         await cartdata.save()
//         res.status(200).send(cartdata)
//     }
//     catch (error) {
//         res.status(404).send(error.message);
//     }
// })
//for increase the count of item
cartRouter.patch("/inc/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { itemid } = req.query;
    console.log(id);
    console.log(itemid);
    let newdata = await UserModel.updateMany(
      { _id: id, "cartItems._id": itemid },
      { $inc: { "cartItems.$.quantity": 1 } }
    );
    res.send(newdata).status(200);
    // db.users.updateOne({ _id: ObjectId('6340466ede6af2d810b2367e'), "cartItems.id": "10956-020" }, { $set: { "cartItems.$.quantity": 2 } })
    // db.carts.updateOne({ _id: ObjectId('634012651b299255346e8a54'), "demo.name": "vishal" }, { $set: { "demo.$.name": "vishalkarale" } })
    // db.users.updateOne({ _id: ObjectId('6340466ede6af2d810b2367e'), "cartItems.review_count": 118 }, { $set: { "review_count.$.quantity": 2 } })
  } catch (error) {
    res.send(error);
  }
});
// db.users.updateOne({ _id: ObjectId('6340469bde6af2d810b23681'), "cartItems.id": "10956-020" }, { $pull: { cartItems: { _id: ObjectId('6340c4f183fcc7a4628137d4') } } })
// { $pull: { results: { score: 8, item: "B" } } }

//for Descrease the count of item
// cart.patch('/dec/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const cartdata = await CartModel.findOneAndUpdate({ _id: id }, { $inc: { quantity: -1 } }, { new: true });
//         // await cartdata.save()
//         res.status(200).send(cartdata)
//     }
//     catch (error) {
//         res.status(404).send(error.message);
//     }
// })

// for decrease the count of item
cartRouter.patch("/dec/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { itemid } = req.query;
    console.log(id);
    console.log(itemid);
    let newdata = await UserModel.updateMany(
      { _id: id, "cartItems._id": itemid },
      { $inc: { "cartItems.$.quantity": -1 } }
    );
    res.send(newdata).status(200);
    // db.users.updateOne({ _id: ObjectId('6340466ede6af2d810b2367e'), "cartItems.id": "10956-020" }, { $set: { "cartItems.$.quantity": 2 } })
    // db.carts.updateOne({ _id: ObjectId('634012651b299255346e8a54'), "demo.name": "vishal" }, { $set: { "demo.$.name": "vishalkarale" } })
    // db.users.updateOne({ _id: ObjectId('6340466ede6af2d810b2367e'), "cartItems.review_count": 118 }, { $set: { "review_count.$.quantity": 2 } })
  } catch (error) {
    res.send(error);
  }
});
// db.students.updateOne(
//     { _id: 4, "grades.grade": 85 },
//     { $set: { "grades.$.std": 6 } }
// )

//delete item
cartRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { cartitemid } = req.query;
    // console.log(cartitemid, id);
    const cartdata = await UserModel.updateOne(
      { _id: id, "cartItems._id": cartitemid },
      { $pull: { cartItems: { _id: cartitemid } } }
    );
    console.log(cartdata);
    // await cartdata.save();
    res.status(200).send(cartdata);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

cartRouter.delete("/all/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let user = await UserModel.findById(id);
    user.cartItems = [];
    await user.save();
  } catch (error) {
    res.status(404).send(error.message);
  }
});

cartRouter.get("/count", async (req, res) => {
  try {
    const cartdata = await CartModel.countDocuments();
    console.log(cartdata);
    res.send((count = cartdata.toString())).status(200);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = {cartRouter};
