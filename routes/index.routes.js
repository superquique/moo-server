const router = require('express').Router();

// Grouping them under sub-paths
router.use('/notebooks', require('./notebook.routes'));
router.use('/sheets', require('./sheet.routes'))

module.exports = router;
