const contactRouter = require('express').Router();
const contactController = require('../controllers/contactController');

contactRouter.get('/', contactController.getAllContact)

contactRouter.get('/:id', contactController.getSingleContact)

module.exports = contactRouter;