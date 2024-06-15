const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phno: { type: Number, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
});
const register = mongoose.model("Register", registerSchema);

const categorySchema = mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
});
const category = mongoose.model("category", categorySchema);

const loginSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userStatus: { type: Number },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "Register" },
});
const login = mongoose.model("Login", loginSchema);

const subcategorySchema = mongoose.Schema({
  subcategory: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
});
const subcategory = mongoose.model("subcategory", subcategorySchema);

const productSchema = mongoose.Schema({
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "subcategory" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  product: { type: String, required: true },
  descriptions: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});
const product = mongoose.model("product", productSchema);

module.exports = { register, login, category, subcategory, product };
