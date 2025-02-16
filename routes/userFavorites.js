const express = require('express');
const router = express.Router();


const favoritesControllers = require('../controllers/favoritesControllers');
const verifyJWT = require('../middleware/verifyJWT');



router.use(verifyJWT)

router.route("/")
            .get(favoritesControllers.getFavorites)
            .post(favoritesControllers.addToFavorites)
            .delete(favoritesControllers.removeFromFavorites);



module.exports = router;