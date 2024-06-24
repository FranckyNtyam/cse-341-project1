const contactRouter = require('express').Router();
const contactController = require('../controllers/contactController');

contactRouter.get('/', contactController.getAllContact)

contactRouter.get('/:id', contactController.getSingleContact)
contactRouter.post('/', contactController.createContact)
contactRouter.put('/:id', contactController.updateContact)
contactRouter.delete('/:id', contactController.deleteContact)

module.exports = contactRouter;