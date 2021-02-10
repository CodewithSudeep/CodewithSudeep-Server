const authenticationModel = require('../Models/Authentication');
const Joi = require("joi");

module.exports = {
    // user registration middleware
    userRegistrationMiddleware: async (req, res, next) => {
        const { email, password } = req.body;

        // credentials validation
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required().min(8).max(15),
        });

        const authValidation = schema.validate({ email, password });

        if (authValidation.error && authValidation.error.details)
            return res.status(400).json({
                msg: authValidation.error.details[0].message,
            });

        try {
            // existing user validation
            const userExist = await authenticationModel.findOne({ email });

            if (userExist)
                return res.status(400).json({
                    msg: "User with that email already exists!",
                });

            else next();
        } catch (error) {
            console.log(error)
        }
    },

    // user validation middleware
    userValidationMiddleware: (req, res, next) => {
        const { email, password } = req.body;

        // credentials validation
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required().min(8).max(15),
        });

        const authValidation = schema.validate({ email, password });

        if (authValidation.error && authValidation.error.details)
            return res.status(400).json({
                msg: authValidation.error.details[0].message,
            });

        else next()
    },

    removeUserMiddleware: async (req, res, next) => {
        try {
            const { _id } = req.body;

            // _id validation
            const schema = Joi.object().keys({
                _id: Joi.string().min(8).required(),
            });

            const tokenValidation = schema.validate({ _id });

            if (tokenValidation.error && tokenValidation.error.details)
                return res.status(400).json({
                    msg: tokenValidation.error.details[0].message,
                });

            const userExist = await authenticationModel.findOne({ _id });

            if (!userExist)
                return res.status(400).json({
                    msg: "User do not exists!",
                });

            else next();
        } catch (error) {
            console.log(error)
        }
    }
}