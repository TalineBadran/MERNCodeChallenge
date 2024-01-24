const express = require('express');
const Model = require('../model/model');
const router = express.Router()

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getCustomer/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = {
            name: req.body.name,
            countryCode:req.body.countryCode,
            mobile:req.body.mobile,
            countryName:req.body.countryName,
            city:req.body.city,
            address: req.body.address
        };
        const options = { new: false };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(true)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(true)
    }
    catch (error) {
        res.status(400).send(false);
    }
})

//Add Customer
router.post('/addCustomer', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        countryCode:req.body.countryCode,
        mobile:req.body.mobile,
        countryName:req.body.countryName,
        city:req.body.city,
        address: req.body.address
    })

    try {
        await data.save();
        res.status(200).send(true)
    }
    catch (error) {
        res.status(400).send(false);
    }
})

// Get customer by phone number
router.get('/getCustomerByPhoneNumber/:phoneNumber', async (req, res) => {
    try {
        const phoneNumber = req.params.phoneNumber;
        const data = await Model.findOne({ mobile: phoneNumber });

        if (data) {
            const customerInfo = {
                name: data.name,
                countryCode: data.countryCode,
                countryName: data.countryName,
                city: data.city,
                address: data.address
            };

            res.json(customerInfo);
        } else {
            res.status(404).json({ message: 'Customer not found for the given phone number' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;