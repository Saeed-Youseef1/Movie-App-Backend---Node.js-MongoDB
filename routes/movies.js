const express = require('express');
const router = express.Router();


const moviesControllers = require('../controllers/moviesControllers');



const verifyJWT = require('../middleware/verifyJWT');
const verifyRole = require('../middleware/verifyRole');


router.route("/")
    .get(moviesControllers.getAllMovies)
    .post(verifyJWT, verifyRole("admin"), moviesControllers.AddMovie); 

router.route("/category")
    .get(moviesControllers.getMoviesByCategory); 

router.route("/:title")
    .get(moviesControllers.getSingleMovie)
    .patch(moviesControllers.updateRate)
    .delete(verifyJWT, verifyRole("admin"), moviesControllers.deleteMovie);  

// verifyRole("admin"),


module.exports = router;