const Provide = require('../models/Provide');

module.exports = {
    async create(req, res) {
        try {
            const provide = await Provide.create(req.body);

            return res.json(provide);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: "Error creating provider" });
        }
    },

    async indexProviders(req, res) {
        const provide = await Provide.find({})
        if (provide) {
            return res.json(provide);
        }

        return res.status(400).json({ error: "Providers not found." });
    },

    async index(req, res) {
        try {
            const provide = await Provide.findOne({ name: req.body.name });

            if (provide) {
                return res.json(provide);
            }

            
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: "Provider not found." });
        }
    },

}