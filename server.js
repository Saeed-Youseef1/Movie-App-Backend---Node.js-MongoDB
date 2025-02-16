// Server
const express = require("express");
const app = express();
app.use(express.json());

// .env
require('dotenv').config();
const PORT = process.env.PORT;

// cors
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
app.use(cors(corsOptions));


// cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Data Base
const mongoose = require('mongoose');
const connectDB =require('./config/configDb');
connectDB();


// Routes

const routerAuth = require('./routes/authUser');
const routerusers = require('./routes/users');
const routerUserfavorites = require('./routes/userFavorites');
const routerUsergetWatchesLater = require('./routes/userWatchLater');
const routermovies = require('./routes/movies');

app.use("/auth",routerAuth);
app.use("/users",routerusers);
app.use("/user/favorites",routerUserfavorites);
app.use("/user/watchesLater",routerUsergetWatchesLater);
app.use("/movies",routermovies);



// Data Base & Server Run
mongoose.connection.once('open',()=> {
    console.log('Database Is Connected')
    app.listen(PORT,()=> {
        console.log(`Server Running On Port ${PORT}`);
    })
})

mongoose.connection.on('error',(err)=>{ 
    console.log(err);
})


