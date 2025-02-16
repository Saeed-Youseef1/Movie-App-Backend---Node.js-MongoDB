const User = require("../models/user");


const getFavorites = async (req, res) => {
    try {
        const userId = req.user;

        const user = await User.findById(userId).populate("favorites");  
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const addToFavorites = async (req, res) => {
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

        if (user.favorites.includes(movieId)) {
            return res.status(400).json({ message: "Movie already in favorites" });
        }

        user.favorites.push(movieId);
        await user.save();

        res.status(200).json({ message: "Movie added to favorites", favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const removeFromFavorites = async (req, res) => {
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

        user.favorites = user.favorites.filter(id => id.toString() !== movieId);
        await user.save();

        res.status(200).json({ message: "Movie removed from favorites", favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {
    getFavorites,addToFavorites,removeFromFavorites
 }
