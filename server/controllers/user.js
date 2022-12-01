const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { token } = require("morgan");

//! Models
const MyUser = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

//! #############  lists  ##############

exports.listUsers = async (req, res) => {
  try {
    const user = await MyUser.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};

exports.readUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await MyUser.findOne({ _id: id }).exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};

///! Update
exports.updateUsers = async (req, res) => {
  try {
    //console.log(req.body.value.password)
    var { id, password } = req.body.value;

    // 1 Gen salt
    const salt = await bcrypt.genSalt(10);
    // 2 Encript
    var enPassword = await bcrypt.hash(password, salt);

    //console.log('En Pass : ', enPassword)

    const user = await MyUser.findOneAndUpdate(
      { _id: id },
      { password: enPassword }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};
//! Remove
exports.removeUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await MyUser.findOneAndDelete({ _id: id }).exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(user);
  }
};
// ! Change status
exports.changeStatus = async (req, res) => {
  try {
    //  console.log(req.body)

    const user = await MyUser.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

///! Change Role
exports.changeRole = async (req, res) => {
  try {
    //console.log(req.body)

    const user = await MyUser.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

//! User Cart
exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    // Check user is authorization token login
    let user = await MyUser.findOne({ username: req.user.username }).exec();
    let products = [];
    // Check old cart
    let cartOld = await Cart.findOne({ orderBy: user._id }).exec();
    if (cartOld) {
      cartOld.remove();
      console.log("Remove old cart");
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;

      products.push(object);
    }

    // Sumation in Cart
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user._id,
    }).save();

    console.log(newCart);
    res.send("User OK");
  } catch (error) {
    console.log(error);
    res.status(500).send("User cart server error!!");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    // Check user authorization login
    const user = await MyUser.findOne({ username: req.user.username }).exec();
    let cart = await Cart.findOne({ orderBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    const { products, cartTotal } = cart;

    res.json({ products, cartTotal });
  } catch (error) {
    console.log(error);
    res.status(500).send("GET User failed");
  }
};



//! Clear Cart
exports.emptyCart = async (req, res) => {
  try {
    // Check user authorization login
    const user = await MyUser.findOne({ username: req.user.username }).exec();

    const empty = await Cart.findOneAndRemove({
      orderBy : user._id
      }).exec();

      res.send(empty)
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Clear cart Error");
  }
};

//! Save Address
exports.saveAddress = async (req, res) => {
  try {
    const userAddress = await MyUser.findOneAndUpdate(
      { username: req.user.username },
      { address: req.body.address }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Save address failed");
  }
};

//! Save order
exports.saveOrder = async (req, res) => {
  try {
    let user = await MyUser.findOne({ username: req.user.username }).exec();

    const userCart = await Cart.findOne({ orderBy: user._id }).exec();

    const order = await new Order({
      products: userCart.products,
      orderBy: user._id,
      cartTotal: userCart.cartTotal,
    }).save();

    // + sold and - quantity
    let bulkOption = userCart.products.map((item)=>{
      return {
        updateOne : {
          filter : {_id : item.product._id},
          update : {$inc:{quantity : -item.count, sold:+item.count}}
        }
      }
    })

    let updated = await Product.bulkWrite(bulkOption, {})

    res.send(updated);

  } catch (error) {
    console.log(error);
    res.status(500).send("Save order failed");
  }
};

// ! Add to wishlist
exports.addToWishList = async (req, res)=>{
  try {
    const {productId} = req.body;
    let user = await MyUser.findOneAndUpdate(
      {
        username: req.user.username
      },
      {
        $addToSet:{wishlist:productId}
      }
    ).exec();
    res.send(user)
    
  } catch (error) {
    console.log(error)
    res.status(500).send("Add to wishlist error !!")
  }
}
// ! get wishlist
exports.getWishList = async (req, res)=>{
  try {
    let list = await MyUser.findOne({username:req.user.username})
    .select('wishlist').populate('wishlist').exec();
    res.json(list)
  } catch (error) {
    console.log(error)
    res.status(500).send("get wishlist error !!")
  }
}
// ! remove wishlist
exports.removeWishList = async (req, res)=>{
  try {
    // http://localhost:9000/user/wishlist/1233535
    const {productId} = req.params
    let user = await MyUser.findOneAndUpdate(
      {username:req.user.username},
      {$pull:{wishlist:productId}}
    ).exec();
    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send("Remove wishlist error !!")
  }
}

//! get order (History Order)
exports.getOrder = async (req, res) => {
  try {
    // Check user authorization login
    const user = await MyUser.findOne({ username: req.user.username }).exec();
    let order = await Order.find({ orderBy: user._id })
      .populate("products.product")
      .exec();
    res.json(order)
  } catch (error) {
    console.log(error);
    res.status(500).send("Get order history error!!");
  }
};
