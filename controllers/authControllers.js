const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req,res)=> {
    const {first_name,last_name,email,password} = req.body;

    if(!first_name ||!last_name ||!email ||!password) {
        return res.status(400).json({message: "All Fields Are Required :("})
    }

    const foundUser = await User.findOne({email}).exec();

    if(foundUser) {
        return res.status(401).json({message:"User Already Exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user  = await  User.create({
        first_name,
        last_name,
        email,
        password:hashedPassword,
        role:req.body.role
    });
    const accessToken = jwt.sign({
        UserInfo: {
            id:user._id,
            role:user.role
        }
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:30})


    const refreshToken = jwt.sign({
        UserInfo: {
            id:user._id,
            role:user.role
        }
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})


    res.cookie("jwt",refreshToken,{
        httpOnly:true,  // access only by web server
        secure:false,    // https 
        sameSite:"None",// to send cookie to domain and all subs domain 
        maxAge: 7*24*60*60*1000
    })

    res.status(201).json({accessToken,email:user.email,first_name:user.first_name,last_name:user.last_name,role:user.role})
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "All Fields Are Required :(" });
    }

    const foundUser = await User.findOne({ email }).exec();
    
    if (!foundUser) {
        return res.status(401).json({ message: "User Not Exists" });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    
    if (!match) {
        return res.status(401).json({ message: "Wrong Password Try Again" });
    }

    const accessToken = jwt.sign({
        UserInfo: {
            id: foundUser._id,
            role: foundUser.role 
        }
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 30 });

    const refreshToken = jwt.sign({
        UserInfo: {
            id: foundUser._id,
            role: foundUser.role 
        }
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", refreshToken, {
        httpOnly: true,  // access only by web server
        secure: false,    // https 
        sameSite: "None", // to send cookie to domain and all subs domain 
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ accessToken, email: foundUser.email, role: foundUser.role });
};


const refresh = async (req, res) => {
    const cookies = req.cookies;
    
    if (!cookies?.jwt) { 
        return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt; 

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => { 
        if (err) return res.status(403).json({ message: "Forbidden" });

        const foundUser = await User.findById(decoded.UserInfo.id).exec();
        
        if (!foundUser) {
            return res.status(401).json({ message: "User Not Exists" });
        }

        const accessToken = jwt.sign(
            { UserInfo: { id: foundUser._id ,role:foundUser.role} },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 30 } 
        );

        res.json({ accessToken });
    });
};


const logout =(req,res)=>{
    const cookies = req.cookies; 
    if(!cookies?.jwt) {
        return res.status(200).json({message:"You Are already Logout!!"});
    }

    res.clearCookie("jwt", {
        httpOnly:true,
        secure:false,
        sameSite:true
    })

    return res.json({message:"Logout Successfuly"});
}

module.exports = {
    register,login,logout,refresh
 }
