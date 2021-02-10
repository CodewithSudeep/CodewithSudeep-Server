const express = require("express");
const authRouter = express.Router();

// set new user
const { setNewUser } = require('../Controllers/Authentication');
const { userRegistrationMiddleware } = require("../Middlewares/Authentication");
authRouter.post('/new-user', userRegistrationMiddleware, setNewUser);

// valid existing user i.e. login
const { validateUser } = require('../Controllers/Authentication');
const { userValidationMiddleware } = require("../Middlewares/Authentication");
authRouter.get('/validate-user', userValidationMiddleware, validateUser);

// delete user
const { removeUser } = require('../Controllers/Authentication');
const { removeUserMiddleware } = require("../Middlewares/Authentication");
authRouter.delete('/delete-user', removeUserMiddleware, removeUser);

module.exports = { authRouter };