const express = require("express");
const {connectDB} = require("./configs/db.js");
const {authRouter} = require("./middlewares/auth");
const {userRouter} = require("./controllers/user.controller");
const {productRouter} = require("./controllers/product.controller");
const {cartRouter} = require("./controllers/cart.controller");
const cors = require("cors");

//app.use(express.urlencoded({ extended: true }));
const app = express();
app.use(cors());

//app.get("/", (req, res) => {
 // res.send("Hello World!");
//});

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);


/*const port = process.env.PORT || 3000;
app.listen(port, async (req, res) => {
  try {
    await connection;
    console.log("connected to server");
  } catch (error) {
    console.log(error.message);
  }

});*/

/*app.listen(3000, () => {
  connectDB()
  console.log("Server is running at http://localhost:3000")
})*/
const PORT = process.env.PORT || 3000;

// Ensure database is connected before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Database connection failed", err);
});
