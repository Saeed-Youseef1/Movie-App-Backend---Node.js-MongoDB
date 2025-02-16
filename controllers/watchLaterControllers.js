const User = require("../models/user");


const getWatchesLater = async (req, res) => {
    try {
        const userId = req.user;

        const user = await User.findById(userId).populate("watchLater");  
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ watchLater: user.watchLater });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const addToWatchesLater = async (req, res) => {
    try {
        const userId = req.user; 
        const { movieId } = req.body;

        if (!movieId) {
            return res.status(400).json({ message: "Movie ID is required" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.watchLater.includes(movieId)) {
            return res.status(400).json({ message: "Movie already in watch later list" });
        }

        user.watchLater.push(movieId);
        await user.save();

        res.status(200).json({ message: "Movie added to watch later", watchLater: user.watchLater });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const removeFromWatchesLater = async (req, res) => {
    try {
        const userId = req.user;
        const { movieId } = req.body;

        if (!movieId) {
            return res.status(400).json({ message: "Movie ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.watchLater = user.watchLater.filter(id => id.toString() !== movieId);
        await user.save();

        res.status(200).json({ message: "Movie removed from watch later", watchLater: user.watchLater });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getWatchesLater,
    addToWatchesLater,
    removeFromWatchesLater
};
