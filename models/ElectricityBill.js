const mongoose = require('mongoose');

const electricityBillSchema = mongoose.Schema({

    bill_date: {
        type: Date,
        required: true,
    },
    paid_date: {
        type: Date,
        required: true
    },
    unit_consumed: {
        type: Number,
        required: true
    },
    bill_amount: {
        type: Number,
        required: true
    },
    payment_amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const electricityBillModel = mongoose.model('electricitybill', electricityBillSchema);

module.exports = electricityBillModel;