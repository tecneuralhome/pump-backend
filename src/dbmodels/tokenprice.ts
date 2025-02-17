import mongoose from 'mongoose';

var tokenPriceSchema = new mongoose.Schema({
    key: {
        type: String,
    },
    price: {
        type: Number,
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('tokenprice', tokenPriceSchema,"tokenprice");