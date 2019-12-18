const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
};

module.exports = {

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found." });
        }

        if (!(await user.compareHash(password))) {
            return res.json({ error: "Invalid password." });
        }

        const { _id, name, isAdmin } = user;

        return res.json({
            user: { _id, name, email },
            token: User.generateToken(user)
        });
    },

    async store(req, res) {
        const { email } = req.body;

        if (await User.findOne({ email })) {
            return res.status(400).json({ error: "User already exists" });
        }

        const user = await User.create(req.body);

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });
    },

    async index(req, res) {
        const user = await User.findOne({ name: req.body.name })
        
        if (user) {
            return res.json(user);
        }

        return res.status(400).json({ error: "User not found." });
    },

    async indexUsers(req, res) {
        const user = await User.find({})
        if (user) {
            return res.json(user);
        }

        return res.status(400).json({ error: "Users not found." });
    },

    async update(req, res) {
        console.log(req.userId)
        try {
            const user = await User.findByIdAndUpdate(req.userId, {
                '$set': {
                    name: req.body.name,
                    email: req.body.email
                }
            }, { new: true });

            return res.send({ user });

        } catch (err) {
            return res.status(400).send({ error: 'Error updating task' })
        }
    },

    async destroy(req, res) {
        await User.deleteOne({ _id: req.params.id });
        return res.json({ message: "User deleted." });
    }
};
