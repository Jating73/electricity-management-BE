////////////////////////////////////////////////////////////////////////
// Required modules
////////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const Joi = require('joi');

////////////////////////////////////////////////////////////////////////
// Required functions and constants
////////////////////////////////////////////////////////////////////////
var constants = require('../utils/constants');

// Imported Model
const Electricity = require('../models/ElectricityBill');

// Fetch all bills record in paginated way
router.get('/', async (req, res) => {
    let response = {};
    let statusCode = constants.statusCodes.BAD_REQUEST;
    try {
        const electricity = await Electricity.find().select('-unit_consumed -paid_date -payment_amount');

        statusCode = constants.statusCodes.SUCCESS;

        response = {
            status: statusCode,
            message: "Electricity Bills Fetched successfully",
            data: electricity
        };

        return res.status(statusCode).json(response);

    } catch (error) {
        response = {
            status: statusCode,
            error: error.message
        }
        return res.status(statusCode).json(response);
    }

});

// Fetch specific bill record corresponding to id
router.get('/bill/:id', async (req, res) => {
    let response = {};
    let statusCode = constants.statusCodes.BAD_REQUEST;
    let { id } = req.params;
    try {
        const electricity = await Electricity.find({ _id: id });

        statusCode = constants.statusCodes.SUCCESS;

        response = {
            status: statusCode,
            message: "Electricity Bill Details Fetched successfully",
            data: electricity
        };

        return res.status(statusCode).json(response);

    } catch (error) {
        response = {
            status: statusCode,
            error: error.message
        }
        return res.status(statusCode).json(response);
    }

});

// Add a Electricity bill record
router.post('/', async (req, res) => {
    let response = {};
    let statusCode = constants.statusCodes.BAD_REQUEST;

    try {
        const body = req.body;
        const schema = Joi.object().keys({
            bill_date: Joi.string().required(),
            paid_date: Joi.string().required(),
            unit_consumed: Joi.number().required(),
            bill_amount: Joi.number().required(),
            payment_amount: Joi.number().required()
        }).options({ allowUnknown: true });

        const result = await Joi.validate(body, schema);

        if (result.error) {
            throw (new Error("Parameters Missing or not valid"));
        }

        let electricity = new Electricity(body);

        electricity = await electricity.save();

        if (!electricity) {
            throw new Error("Unable to complete action");
        }

        statusCode = constants.statusCodes.SUCCESS;

        response = {
            status: statusCode,
            message: "Electricity Bill Added successfully",
            data: electricity
        };

        return res.status(statusCode).json(response);

    } catch (error) {
        response = {
            status: statusCode,
            error: error.message,
            error_description: error
        }
        return res.status(statusCode).json(response);
    }
});

// Upate bill details using bill_id
router.put('/:id/edit', async (req, res) => {
    let response = {};
    let statusCode;

    try {
        const params = req.params;
        const body = req.body;

        body.id = params.id;

        const schema = Joi.object().keys({
            id: Joi.string().required(),
            update_keys: Joi.object().keys({
                bill_date: Joi.string().required(),
                paid_date: Joi.string().required(),
                unit_consumed: Joi.number().required(),
                bill_amount: Joi.number().required(),
                payment_amount: Joi.number().required()
            })
        }).options({ allowUnknown: true });

        const result = Joi.validate(body, schema);

        if (result.error) {
            throw (new Error("Parameters Missing or not valid"));
        }

        let electricity = Electricity.find({ _id: body.id });

        if (!electricity) {
            throw new Error("No Such Id Exist");
        }

        electricity = await Electricity.findByIdAndUpdate(
            body.id,
            body.update_keys
        );

        if (!electricity) {
            throw new Error("Unable to update Bill");
        }

        statusCode = constants.statusCodes.SUCCESS;
        response = {
            status: statusCode,
            message: "Electricity Bill Detail Updated successfully",
            data: electricity
        };

        return res.status(statusCode).json(response);

    } catch (error) {
        statusCode = constants.statusCodes.BAD_REQUEST;
        response = {
            status: statusCode,
            error: error.message
        }
        return res.status(statusCode).json(response);
    }
});

// Delete bill details using bill_id
router.delete('/delete/:id', async (req, res) => {
    let response = {};
    let statusCode;

    try {
        const params = req.params;
        const body = req.body;

        body.id = params.id;

        const schema = Joi.object().keys({
            id: Joi.string().required()
        }).options({ allowUnknown: true });

        const result = Joi.validate(body, schema);

        if (result.error) {
            throw (new Error("Parameters Missing or not valid"));
        }

        let electricity = await Electricity.findById(body.id);

        if (!electricity) {
            throw new Error("No Such Data found");
        }

        await Electricity.deleteOne({ _id: body.id });

        statusCode = constants.statusCodes.SUCCESS;
        response = {
            status: statusCode,
            message: "Electricity Record Deleted successfully",
        };

        return res.status(statusCode).json(response);

    } catch (error) {
        statusCode = constants.statusCodes.BAD_REQUEST;
        response = {
            status: statusCode,
            error: error.message
        }
        return res.status(statusCode).json(response);
    }
});

module.exports = router;