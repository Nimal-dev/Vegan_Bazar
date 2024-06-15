const models = require("./admin.model");
const path = require('path');
const fs = require('fs');

const registerModel = models.register
const loginModel = models.login
const categoryModel= models.category
const subcategoryModel=models.subcategory
const productModel = models.product


exports.register = async (req, res) => {
  try {
    const registerparam = {
      name: req.body.name,
      address: req.body.address,
      phno: req.body.phno,
      state: req.body.state,
      pincode: req.body.pincode,
         };

    const registerData = await registerModel.create(registerparam);

    const loginparam = {
      email: req.body.email,
      password: req.body.password,
      userStatus: req.body.userStatus,
      userid: registerData._id,
    };

    await loginModel.create(loginparam);

    res.json("success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "registration failed" });
  }
};


exports.logIn = async (req, res) => {
  try {
    let param = {
      email: req.body.email,
      password: req.body.password
    };

    const user = await loginModel.findOne({ email: param.email }).populate('userid');
    // console.log(user);
    if (user) {
      // Check if password matches
      if (user.password === param.password) {
        // Check userstatus
        if (user.userStatus == 0 || user.userStatus == 1) {
          req.session.user = user; // Setting session with user details
          // console.log(user);
          // Return user
          res.json(user);
        } else {
          // Invalid user status
          res.json("Invalid user status ");
        }
      } else {
        // Invalid password
        res.json("Invalid password");
      }
    } else {
      // User not found
      res.json("invalid user");
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.addCategory = async (req, res) => {
//   try {
//     if (!req.files || !req.files.img) {
//       return res.status(400).json({ error: "No image file uploaded" });
//     }

//     const filesUp = req.files.img;

//     let categoryData = {
//       category: req.body.category,
//       description: req.body.description,
//       img: filesUp.name,
//     };

//     await categoryModel.create(categoryData);

//     const imageDir = path.join(__dirname, 'public', 'images');
//     if (!fs.existsSync(imageDir)) {
//       fs.mkdirSync(imageDir, { recursive: true });
//     }

//     const imgPath = path.join(imageDir, filesUp.name);
//     await filesUp.mv(imgPath);

//     res.json("success");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "registration failed" });
//   }
// };
try{
       
  const category = await categoryModel.create(req.body);
  res.json(category);
}
catch(error){
  console.log(error);
   res.status(500).json({ error: "Internal server error" });
}
};

exports.viewCategory=async (req,res)=>{
  const categorylist = await categoryModel.find();
  // console.log(categorylist);
  res.json(categorylist);
};

exports.deletecategory= async (req,res) =>{
  try {
    const deletecategory = await categoryModel.findByIdAndDelete(req.body.id);
    // console.log(deletetask);
    res.json(deletecategory);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Error deleting category" });
  }
}



exports.findCategory = async (req, res) => {
  const getCategory = await categoryModel.findById(req.body.id);
  // console.log(getCategory);
  res.json({ getCategory});
};

exports.Editcategory = async (req, res) => {
  try {
    const updatecategory = await categoryModel.findByIdAndUpdate(req.body.id, {
      category: req.body.categorys,
      description: req.body.descriptions,
    });
    res.json(updatecategory);
  } catch (error) {
    console.error("Error updating :", error);
    res.status(500).json({ error: "Error updating category" });
  }
};


exports.addSubcategory = async (req, res) => {
try{
const subcategoryparam = {
  category: req.body.category,
  subcategory: req.body.subcategory,
};

await subcategoryModel.create(subcategoryparam);

res.json("success");
} catch (error) {
console.error(error);
res.status(500).json({ error: "subcategory can't add" });
}
};

exports.viewSubcategory=async (req,res)=>{
  const subcategorylist = await subcategoryModel.find().populate('category')
  const categorylist = await categoryModel.find();
  // console.log(categorylist);
  console.log(subcategorylist);
  res.json({subcategorylist,categorylist});
};

exports.deleteSubcategory= async (req,res) =>{
  try {
    const deletesubcategory = await subcategoryModel.findByIdAndDelete(req.body.id);
    // console.log(deletetask);
    res.json(deletesubcategory);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Error deleting category" });
  }
}

exports.FindSubcategory = async (req, res) => {
  const getsubCategory = await subcategoryModel.findById(req.body.id).populate('category')
  // const categorylist = await categoryModel.findOne({_id:getsubCategory.category});
  // console.log(categorylist);
  res.json({ getsubCategory});
};


exports.editSubcategory = async (req, res) => {
  try {
    const updatesubcategory = await subcategoryModel.findByIdAndUpdate(req.body.id, {
      // category: req.body.categorys,
      subcategory: req.body.subcategorys,
    });
    res.json(updatesubcategory);
  } catch (error) {
    console.error("Error updating :", error);
    res.status(500).json({ error: "Error updating subcategory" });
  }
};

exports.addProduct = async (req, res) => {
try{
       
  const product = await productModel.create(req.body);
  res.json(product);
}
catch(error){
  console.log(error);
   res.status(500).json({ error: "Internal server error" });
}
};

exports.viewProduct = async (req, res) => {
  try {
    const Product = await productModel.find().populate('category').populate('subcategory');
    res.json(Product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.viewbyid = async (req, res) => {
  try {
    const { id } = req.body; 

    const product = await productModel.findById(id).populate('category').populate('subcategory');
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.update = async (req, res) =>
//   {
//   try {
//     const { id, book, authorid, genreid, price, image } = req.body;

//     // Update the book with the provided data
//     const updatedBook = await Book.findByIdAndUpdate(
//       id,
//       {
//         book,
//         author_id: authorid,
//         genre_id: genreid,
//         price,
//         image
//       },
//       { new: true }
//     );

//     if (!updatedBook) {
//       return res.status(404).json({ error: "Book not found" });
//     }

//     res.json(updatedBook);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// 
exports.updateProduct = async (req, res) => {
  try {
    const { id, product, category, subcategory, price, descriptions, image } = req.body;

    // Update the product with the provided data
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        product,
        category,
        subcategory,
        price,
        descriptions,
        image
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    if (!productId) {
      return res.status(400).json({ error: "product ID is required" });
    }
    const product = await productModel.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
