const userModel = require('../Modules/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const create = async (req,res,next,) => {
    //this logic first checks if registered email exist in database, if it does, fresh registration will terminate
                const existUser = await userModel.findOne({
                 Email: req.body.Email
             })
             if (existUser) {
                 res.json("user already exist, try login or reset password option")}
       // If user is newly registered, then the following logic shall run
                 else{
    try{const newUser = await userModel.create({
        Name: req.body.Name,
        Email: req.body.Email,
        password: req.body.password
})
console.log(newUser)
res.json({
    Message:'User Successfully registered',
    status : 'Success'
})
    }
    catch(error){console.log(error)}
};
    
}

//This is applicable at login route to check if a user is registered to database 
//and has access to the information there of
const authenticate = async (req,res,next) => {
    const existUser = await userModel.findOne({
        Email : req.body.Email
    })
    if(existUser){
        const isValidPassword = bcrypt.compareSync(req.body.password, existUser.password);
        if(isValidPassword){
            const token = jwt.sign({
                id : existUser._id
            },
            'secretkey',
            {expiresIn: '3h'}
            );
            res.json({
                status: 'success',
                message: "user found",
                data: {
                    user: {name : existUser.Name,
                    email: existUser.Email},
                    token: token
                }
            }) 
        }
        else {
            res.json({
                status: 'error',
                Message: "password invalid"
            })
        }   
    }

    else{res.json({
        status: 'error',
        Message: "incorrect email or user does not exist "
    })}
};

module.exports = {
    create,
    authenticate 
}