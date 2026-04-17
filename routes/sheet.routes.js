const router = require("express").Router();
const Sheet = require("../models/Sheet.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isOwner } = require("../middleware/owner.middleware.js");

// POST / Create a sheet
router.post("/", isAuthenticated, (req, res, next) => {
    const userId = req.payload._id;
    const newSheet = req.body;

    newSheet.user = userId;

    Sheet.create(newSheet)
    .then((sheetFromDb) => {
      console.log("Created new sheet", sheetFromDb);
      res.status(201).json(sheetFromDb);
    })
    .catch((error) => {
      next(error);
    })
})

// PUT / Update a sheet
router.put("/:id", isAuthenticated, isOwner(Sheet), (req, res, next) => {
    const { id } = req.params;
    const newDetails = req.body;

    console.log(newDetails);
    
    Sheet.findByIdAndUpdate(id, newDetails, {returnDocument: 'after'})
    .then((sheetFromDb) => {
      console.log("Updated sheet", sheetFromDb);
      res.status(200).json(sheetFromDb);
    })
    .catch((error) => {
      next(error);
    })
})

// DELETE / Delete a sheet
router.delete("/:id", isAuthenticated, isOwner(Sheet), (req, res, next) => {
    const { id } = req.params;

    Sheet.findByIdAndDelete(id)
    .then((result) => {
      console.log("Deleted sheet", result);
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    })
})

// GET /:id - Get a sheet by id
router.get("/:id", isAuthenticated, isOwner(Sheet), (req, res, next) => {
    console.log(`req.payload`, req.payload);

    try {
        res.status(200).json(req.resource);
    } catch (error) {
        next(error);
    }
    
});

// GET / - Get a list of sheets
router.get("/", isAuthenticated, (req, res, next) => {
    console.log(`req.payload`, req.payload);
    const userId = req.payload._id;
    const favorite = req.query.favorite;
    const title = req.query.title;

    let query = {user: userId};

    if (favorite) {
      query.isFavorite = favorite === 'true';
    }

    if (title) {
      query.$text = { $search: title}
    }

    Sheet.find(query).populate('notebook')
    .then((sheets) => {
      console.log("Found sheets", sheets);
      res.status(200).json(sheets);
    })
    .catch((error) => {
      next(error);
    })
})

// GET / - Get a list of sheets from notebook
router.get("/notebook/:notebookId", isAuthenticated, (req, res, next) => {
    console.log(`req.payload`, req.payload);
    const userId = req.payload._id;
    const { notebookId } = req.params;
    const title = req.query.title;

    let query = {user: userId, notebook: notebookId}

    if (title) {
      query.$text = { $search: title}
    }

    Sheet.find(query)
    .then((sheets) => {
      console.log("Found sheets", sheets);
      res.status(200).json(sheets);
    })
    .catch((error) => {
      next(error);
    })
})

module.exports = router;