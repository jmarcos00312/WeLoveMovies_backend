const router = require("express").Router();
const controller = require("./moviesController");
const methodnotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:movieId/theaters")
  .get(controller.getTheaters)
  .all(methodnotAllowed);

router
.route("/:movieId/reviews")
.get(controller.movieReviews)
.all(methodnotAllowed);



router.route("/:movieId").get(controller.read).all(methodnotAllowed);

router.route("/").get(controller.list).all(methodnotAllowed);

module.exports = router;
