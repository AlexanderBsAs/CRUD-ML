const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		res.render("index",{producto: products})
	},
	search:(req,res)=> {
		let ingreso=req.query.keywords
		let array=[]
		let metodo =products.forEach((elemento)=>{
		if ( elemento.name.includes(ingreso))
		{array.push(elemento)}
		})
	   if(metodo){
		return metodo
	   }
		res.render("results", { ingreso, array})
	}
};

module.exports = controller;
