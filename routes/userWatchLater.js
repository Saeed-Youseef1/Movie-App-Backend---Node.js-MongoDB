const express = require('express');
const router = express.Router();


const WatchesLaterControllers = require('../controllers/watchLaterControllers');
const verifyJWT = require('../middleware/verifyJWT');



router.use(verifyJWT)

router.route("/")
            .get(WatchesLaterControllers.getWatchesLater)
            .post(WatchesLaterControllers.addToWatchesLater)
            .delete(WatchesLaterControllers.removeFromWatchesLater);



module.exports = router;