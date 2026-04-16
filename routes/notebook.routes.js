const router = require("express").Router();
const Notebook = require("../models/Notebook.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isOwner } = require("../middleware/owner.middleware.js");

// POST / Create a notebook
router.post("/", isAuthenticated, (req, res, next) => {
    const userId = req.payload._id;
    const newNotebook = req.body;

    newNotebook.user = userId;

    Notebook.create(newNotebook)
    .then((notebookFromDb) => {
      console.log("Created new notebook", notebookFromDb);
      res.status(201).json(notebookFromDb);
    })
    .catch((error) => {
      next(error);
    })
})

// PUT / Update a notebook
router.put("/:id", isAuthenticated, isOwner(Notebook), (req, res, next) => {
    const { id } = req.params;
    const newDetails = req.body;

    Notebook.findByIdAndUpdate(id, newDetails, {returnDocument: 'after'})
    .then((notebookFromDb) => {
      console.log("Updated notebook", notebookFromDb);
      res.status(200).json(notebookFromDb);
    })
    .catch((error) => {
      next(error);
    })
})

// DELETE / Delete a notebook
router.delete("/:id", isAuthenticated, isOwner(Notebook), (req, res, next) => {
    const { id } = req.params;

    Notebook.findByIdAndDelete(id)
    .then((result) => {
      console.log("Deleted notebook", result);
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    })
})

// GET /:id - Get a notebook by id
router.get("/:id", isAuthenticated, isOwner(Notebook), (req, res, next) => {
    console.log(`req.payload`, req.payload);

    try {
        res.status(200).json(req.resource);
    } catch (error) {
        next(error);
    }
    
});

// GET / - Get a list of notebooks
router.get("/", isAuthenticated, (req, res, next) => {
    console.log(`req.payload`, req.payload);
    const userId = req.payload._id;
    const favorite = req.query.favorite;

    query = {user: userId};

    if (favorite) {
      query.isFavorite = favorite === 'true';
    }

    Notebook.find(query)
    .then((notebooks) => {
      console.log("Found notebooks", notebooks);
      res.status(200).json(notebooks);
    })
    .catch((error) => {
      next(error);
    })
})

module.exports = router;