const service = require("./moviesService");
const treeize = require("../utlis/treeize");
const knex = require("../db/connection");

async function movieExists(req, res, next) {
  const knexInstance = req.app.get("db");
  const error = { status: 404, message: `Movie cannot be found` };
  const { movieId } = req.params;
  if (!movieId) return next(error);

  let movie = await service.getMoviesById(movieId);
  if (!movie) return next(error);
  res.locals.movie = movie;
  next();
}

async function list(req, res, next) {
  if (req.query.is_showing === "true") {
    await activeMovies(req, res, next);
  } else {
    const knexInstance = req.app.get("db");
    const data = await service.getAllMovies(knexInstance);
    res.json({ data });
  }
}

async function activeMovies(req, res, next) {
  knexInstance = req.app.get("db");
  const data = await service.getMoviesShowing(knexInstance);
  res.json({ data });
}

async function read(req, res, next) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function getTheaters(req, res) {
  const { movieId } = req.params;
  const theaters = await service.getTheaters(movieId);
  res.json({ data: theaters });
}

async function movieReviews(req, res, next) {
  const knexInstance = req.app.get("db");
  let data = await service.getReviews(req.params.movieId, knexInstance);
  data = treeize(data);
  res.json({ data });
}

module.exports = {
  list: [list],
  activeMovies: [activeMovies],
  read: [movieExists, read],
  getTheaters: [movieExists, getTheaters],
  movieReviews: [movieExists, movieReviews],
};
