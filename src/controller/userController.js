const bcryptjs = require('bcryptjs');
const { Op } = require("sequelize");
const {Category, Destination, Image, Property, User} = require('../database/models');
const {
	validationResult
} = require('express-validator');

let usersController = {

register: (req, res) => {
    return res.render ('users/register')
},



processRegister: async (req, res) => {
    const resulValidation = validationResult (req);
    console.log(req.file);
    if (resulValidation.errors.length > 0 ){
        return res.render ('users/register',{
        errors: resulValidation.mapped(),
        oldData: req.body,
        
    });
    }
   
    let newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mail: req.body.mail,
        telephone: req.body.telephone,
        avatar: req.file ? req.file.filename :'Avatar.jpg',
        password: bcryptjs.hashSync(req.body.password, 10),
        admin: 0
    })

    return res.send(newUser)
}, 

login: (req, res) => {
    res.render('users/login')
}, 

loginProcess: (req, res) => {
    res.render('users/loginProcess')
}


}



module.exports = usersController;