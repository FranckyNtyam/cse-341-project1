const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContact = async (req, res) => {
    //#swagger.tag=['Contacts']
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((contacts)=> {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingleContact = async (req, res) => {
    //#swagger.tag=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts)=> {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    //#swagger.tag=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if(result.acknowledged){
        res.status(200).send();
    }else{
        res.status(500).json(result.error || 'Some error occurred while create the contact.');
    }
}

const updateContact = async (req, res) => {
    //#swagger.tag=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const result = await mongodb.getDb().db().collection('contacts').replaceOne({_id: contactId}, contact);
    if(result.modifiedCount > 0){
        res.status(200).send()
    }else{
        res.status(500).json(result.error || 'Some error occurred while update the contact.')
    }
}

const deleteContact = async (req, res) => {
    //#swagger.tag=['Contacts']
    const contactId = new ObjectId(req.params.id);
  
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({_id: contactId}, true);
    if(result.deletedCount > 0){
        res.status(200).send()
    }else{
        res.status(500).json(result.error || 'Some error occurred while delete the contact.')
    }
}

module.exports = { getAllContact, getSingleContact, createContact, updateContact, deleteContact};