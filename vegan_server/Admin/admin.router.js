const express = require('express')
const router = express.Router()

const userController = require('./admin.controller')

router.post('/register', userController.register)
router.post('/login', userController.logIn)
router.post('/addcategory', userController.addCategory)
router.get('/viewcategory',userController.viewCategory)
router.post('/deletecategory', userController.deletecategory)
router.post('/findcategory', userController.findCategory)
router.post('/editcategory', userController.Editcategory)
router.post('/addsubcategory', userController.addSubcategory)
router.get('/viewsubcategory', userController.viewSubcategory)
router.post('/deletesubcategory',userController.deleteSubcategory)
router.post('/findsubcategory',userController.FindSubcategory)
router.post('/editsubcategory',userController.editSubcategory)
router.post('/addproduct', userController.addProduct)
router.get('/viewproduct', userController.viewProduct)
router.post('/deleteproduct', userController.deleteProduct)
router.post('/viewbyid', userController.viewbyid)
// router.post('/updateproduct', userController.updateProduct)
router.post('/updateproduct', userController.updateProduct);




module.exports = router