
const Category = require('../models/Category')

//! List of categories
exports.list = async (req, res)=>{
 try {
     const categories = await Category.find({}).exec();
     res.send(categories);
 } catch (error) {
   res.status(500).send('Server Error to list!!')
 }
}

//! Create a new category
exports.create = async (req, res)=>{
  try {
   // console.log(req.body)
    const {name} = req.body
    const category = await new Category({name}).save();   
    res.send(category)
  } catch (error) {
    res.status(500).send('Server Error to Create !')
  }
}

//! Read
exports.read = async (req, res)=>{
 try {
  const id = req.params.id;
  const category = await Category.findOne({_id:id})
  res.send(category)
 } catch (error) {
  res.status(500).send('Server Error to Read!!')
 }
}

//! Update
exports.update = async (req, res)=>{
  try {
    const id = req.params.id
    const {name} = req.body;
    await Category.findOneAndUpdate({_id:id}, {name:name})
    res.send(`Updated ${name} category successfully`)
  } catch (error) {
    res.status(500).send('Server Error to Update!!')
  }
}

//! Remove
exports.remove = async (req, res)=>{
  try {
    const id = req.params.id
    const category = await Category.findOneAndDelete({_id:id})
    res.send(`Deleted ${category.name} category successfully`)
  } catch (error) {
    res.status(500).send('Server Error to Detete!!')
  }
}