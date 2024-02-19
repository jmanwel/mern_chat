const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const maxAge = 5*24*60*60

const createJWT = id =>{
    return jwt.sign({ id }, "chatroom-secret", {
        expiresIn: maxAge 
    });
}

const alertError = (err)=>{
    let errors= { name:"", email:"", password:"" };

    if (err.message === "incorrect mail"){
        errors.email = "Email not found";
    }

    if (err.message === "incorrect password"){
        errors.password = "Incorrect password";
    }

    if (err.code === 11000){
        errors.email = "Email already registered";
    }

    if (err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}


module.exports.signup = async(req, res) =>{
    console.log("req.body", req.body);
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createJWT(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge*1000 })
        res.status(201).json({ user });
    } catch (e) {
        let errors = alertError(e);
        res.status(400).json({ errors });
    }
}

module.exports.login = async (req, res) =>{
    console.log("req.body", req.body);
    const { email, password } = req.body;
    try {
        const user = await User.login( email, password );
        const token = createJWT(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge*1000 })
        res.status(201).json({ user });
    } catch (e) {
        let errors = alertError(e);
        res.status(400).json({ errors });
    }
}

module.exports.logout = (req, res) =>{
    res.send("logout");
}