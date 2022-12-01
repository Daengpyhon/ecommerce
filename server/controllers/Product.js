const Product = require("../models/Product");

//! Create a new product
exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (error) {
    res.status(500).send("Server Error to Create product!");
  }
};
//! Lists
exports.lists = async (req, res) => {
  try {
    const count = parseInt(req.params.count);

    const product = await Product.find()
      .limit(count)
      .populate("category")
      .sort([["createdAt", "desc"]]);
    res.send(product);
  } catch (error) {
    res.status(500).send("Server Error to Create product!");
  }
};

//! Remove

exports.remove = async (req, res) => {
  try {
    await Product.findOneAndRemove({ _id: req.params.id }).exec();
    res.send(`Removed successfully`);
  } catch (error) {
    res.status(500).send("Remove prodduct error!!");
    console.log(error);
  }
};
//!Update
exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate("category")
      .exec();
    res.send(product);
  } catch (error) {
    res.status(500).send("Read prodduct error!!");
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(product);
  } catch (error) {
    res.status(500).send("Update prodduct error!!");
    console.log(error);
  }
};

//! Lists by
exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    const product = await Product.find()
      .limit(limit)
      .populate("category")
      .sort([[sort, order]]);
    res.send(product);
  } catch (error) {
    res.status(500).send("list by product Error!!");
  }
};

//! Search Filters text

const handleQuery = async (req, res, query) => {
  let products = await Product.find({ $text: { $search: query } }).populate("category", "_id, name");
  res.send(products)
};

//! price search filter
const handlePrice = async (req, res, price) => {
  let products = await Product.find({
    price:{
      $gte:price[0],
      $lte:price[1]
    }
  }).populate("category", "_id, name");
  res.send(products)
};
//! Filters for category
const handleCategory = async (req, res, category) => {
  let products = await Product.find({category}).populate("category", "_id, name");
  res.send(products)
};

//! Controller for filter data
exports.searchFilters = async (req, res) => {
  const { query, price, category } = req.body;

  if (query) {
    console.log("Query : ", query);
    await handleQuery(req, res, query);
  }
  //! Filters price [0, 200]
  if (price !== undefined) {
    console.log("Pirce: ", price);
    await handlePrice(req, res, price);
  }

  //! Filters category [_id, _id]
  if (category) {
    console.log("category: ", category);
    await handleCategory(req, res, category);
  }
};
