const User = require("../models/user");

const getAllUsers = async(req,res)=> {
    const users = await User.find({}).select(["-password","-__v"]).lean();

    if(!users.length) {
        return res.status(400).json({message:"No Users Found"});
    }
    res.json(users);
}


module.exports = {getAllUsers};

