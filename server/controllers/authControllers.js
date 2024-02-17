module.exports.signup = (req, res) =>{
    console.log("req.body", req.body);
    res.send("signup");
}

module.exports.login = (req, res) =>{
    res.send("login");
}

module.exports.logout = (req, res) =>{
    res.send("logout");
}