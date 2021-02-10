const authenticationModel = require('../Models/Authentication');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports = {
    // set new user
    setNewUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const _id = mongoose.Types.ObjectId();

            const newUser = {
                _id,
                email,
                password: hashedPassword,
                created_at: Date.now(),
            };

            authenticationModel.create(newUser, (err) => {
                if (err)
                    return res.status(400).json({
                        errMsg: err,
                    });

                res.status(200).json({
                    msg: "User created successfully!",
                });
            });
        } catch (error) {
            console.log(error);
        }
    },

    // validate user auth
    validateUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            const data = await authenticationModel.findOne({ email });

            if (data) {
                const isPasswordValid = bcrypt.compareSync(password, data.password);

                // if valid password assign a token
                if (isPasswordValid) {
                    const token = await jwt.sign(
                        {
                            data: data._id,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" }
                    );

                    return res.status(200).json({
                        token,
                    });

                    // if invalid password
                } else {
                    res.status(400).json({
                        msg: "Password is incorrect!",
                    });
                }
            } else {
                res.status(400).json({
                    msg: "User with that email was not found!",
                });
            }

        } catch (error) {
            console.log(error)
        }
    },

    // delete user
    removeUser: async (req, res) => {
        const { _id } = req.body;

        try {
            const data = await authenticationModel.deleteOne({ _id })

            if (data.deletedCount === 1)
                return res.status(200).json({
                    msg: "User deleted successfully!",
                });

        } catch (error) {
            console.log(error)
        }
    }
}