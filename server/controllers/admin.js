
const Order = require("../models/Order")

//! Update Order Status

exports.changeOrderStatus = async (req, res) => {
  try {
    const {orderId, orderstatus} = req.body
    let orderUpdate = await Order.findByIdAndUpdate(
      orderId,
      {orderstatus},
      {new: true}
    )
    res.send(orderUpdate)
  } catch (error) {
    res.status(500).send("Server Error to change order status!");
  }
}

exports.getOrderAdmin = async (req, res) => {
  try {
    
    let order = await Order.find()
      .populate("products.product")
      .populate("orderBy", "-password")
      
      .exec();
    res.json(order)
  } catch (error) {
    console.log(error);
    res.status(500).send("Get order history error!!");
  }
};

exports.removeOrder = async (req, res) => {
  try {

    //console.log(req.params)
    await Order.findOneAndRemove({ product: req.params.id }).exec();
    res.send(`Removed order successfully`);
  } catch (error) {
    res.status(500).send("Remove order error!!");
    console.log(error);
  }
};