const knex = require("../db/connection");

const movieReviewCriticJoin = knex("movies as m")
  .distinct()
  .join("reviews as r", "m.movie_id", "r.movie_id")
  .join("critics as c", "r.critic_id", "c.critic_id");

const getAllMovies = () => knex("movies").select("*");

const getMoviesShowing = () =>
  knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true });

const getMoviesById = (movieId) =>
  knex("movies").select("*").where({ movie_id: movieId }).first();

const getReviews = (movieId) =>
  movieReviewCriticJoin
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic-:critic_id",
      "c.preferred_name as critic-:preferred_name",
      "c.surname as critic-:surname",
      "c.organization_name as critic-:organization_name"
    )
    .where({ "r.movie_id": movieId });

const getTheaters = (movieId) =>
  knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select(
      "t.*",
      "mt.created_at",
      "mt.updated_at",
      "mt.is_showing",
      "mt.movie_id"
    )
    .where("mt.movie_id", movieId);
// .andWhere( {"mt.is_showing": true });

module.exports = {
  getAllMovies,
  getMoviesShowing,
  getMoviesById,
  getReviews,
  getTheaters,
};
