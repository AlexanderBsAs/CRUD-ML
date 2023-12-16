const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", { producto: products })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = +req.params.id

		res.render("detail", { producto: products, id })
		// Do the magic
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic

		res.render("product-create-form")
	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic	
		const id=products[products.length-1].id+1
		const { name, price, discount, category, description, image } = req.body
		let nuevo={
			id,
			name,
			price,
			discount,
			category,
			description,
			image: "default-image.png"
		}
		products.push(nuevo)
        
		let json= JSON.stringify(products)

		fs.writeFileSync(productsFilePath,json)
	/* 	res.send(products[products.length-1]) */
	res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const id=+req.params.id
		const producto=products.find(function(elemento){
			return elemento.id==id
		})
		res.render("product-edit-form",{producto,id})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		
		const id= +req.params.id
		const { name, price, discount, category, description, image } = req.body
		let nuevo={
			id,
			name,
			price,
			discount,
			category,
			description,
			image:"default-image.png"
		}

/* 
		products.map(function(elemento){
			if(id==elemento.id){
				elemento=nuevo
				
			}
		
	
		 let json=JSON.stringify(products)
		 fs.writeFileSync(productsFilePath,json,"utf-8")
		 res.send("se guardo el archivo")
			 })
		}, */
		
    let productos2= products.map(function(elemento){
		if(id==elemento.id){
		return nuevo
			
		} 
		return elemento
	 })

	 let json=JSON.stringify(productos2)
	 fs.writeFileSync(productsFilePath,json,"utf-8")
     res.redirect("/products")
		
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let id= +req.params.id
		let filtro=products.filter(function (elemento){
			return elemento.id!=id
		})

		let json=JSON.stringify(filtro)
		fs.writeFileSync(productsFilePath,json,"utf-8")
		// Do the magic
		res.redirect("/products")
	},

};

module.exports = controller;