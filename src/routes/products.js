// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const multer= require("multer")
const path=require("path")

//multer////////

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       let destino=path.join(__dirname,"../../public/images/products")
       return cb(null,destino)
    },
    filename:(req,file,cb)=>{
        let newfile=/* file.fieldname */"image"+"-"+Date.now()+path.extname(file.originalname)
        return cb(null,newfile)
    }
})

let upload=multer({storage:storage})
/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/create',upload.single("image"), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
