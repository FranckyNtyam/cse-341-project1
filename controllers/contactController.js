const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContact = async (req, res) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((contacts)=> {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingleContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts)=> {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

module.exports = { getAllContact, getSingleContact};