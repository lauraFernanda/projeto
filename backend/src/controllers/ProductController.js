const Product = require('../models/Product');

module.exports = {
    async create(req, res) {
        try {
            const product = await Product.create(req.body);

            return res.json(product);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: "Error creating product" });
        }
    },

    async indexProducts(req, res) {
        const product = await Product.find({})
        if (product) {
            return res.json(product);
        }

        return res.status(400).json({ error: "Products not found." });
    },

    async index(req, res) {
        try {
            const product = await Product.findOne({ code: req.body.code });

            if (product) {
                return res.json(product);
            }

            
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: "Product not found." });
        }
    },

}