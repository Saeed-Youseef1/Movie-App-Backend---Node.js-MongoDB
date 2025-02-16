const Movie = require("../models/movie");

const getAllMovies = async(req,res)=> {

    const movies = await Movie.find({}).select(["-__v"]).lean();

    if(!movies.length) {
        return res.status(400).json({message:"No Movies Found"});
    }
    res.json(movies);
}

const getSingleMovie = async (req, res) => {
    try {
        const { title } = req.params;

        const movie = await Movie.findOne({ title }).exec();

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(movie);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const AddMovie = async (req, res) => {
    try {
        const { title, category, rate } = req.body;

        if (!title || !category) {
            return res.status(400).json({ message: "Title and category are required" });
        }

        const existingMovie = await Movie.findOne({ title }).exec();
        if (existingMovie) {
            return res.status(409).json({ message: "Movie already exists" }); 
        }

        const newMovie = await Movie.create({
            title,
            category,
            rate: rate !== undefined ? rate : 0  
        });

        res.status(201).json({ message: "Movie added successfully", movie: newMovie });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const deleteMovie = async (req, res) => {
    try {
        const { title } = req.params;

        const deletedMovie = await Movie.findOneAndDelete({ title }).exec();

        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie deleted successfully", movie: deletedMovie });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getMoviesByCategory = async (req, res) => {
    try {
        const { category } = req.query; 
        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        const movies = await Movie.find({ category });

        if (movies.length === 0) {
            return res.status(404).json({ message: "No movies found in this category" });
        }

        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const updateRate = async (req, res) => {
    try {
        const { title } = req.params; 
        const { rate } = req.body;

        if (!rate && rate !== 0) {
            return res.status(400).json({ message: "Rate is required" });
        }

        const updatedMovie = await Movie.findOneAndUpdate(
            { title }, 
            { rate }, 
            { new: true}  
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ message: "Movie rate updated successfully", movie: updatedMovie });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {getAllMovies,AddMovie,getSingleMovie,deleteMovie,getMoviesByCategory,updateRate};