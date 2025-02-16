const express = require('express');
const router = express.Router();


const usersControllers = require('../controllers/usersControllers');



const verifyJWT = require('../middleware/verifyJWT');
const verifyRole = require('../middleware/verifyRole');


router.use(verifyJWT)

router.route("/").get(verifyRole("admin"),usersControllers.getAllUsers);



module.exports = router;