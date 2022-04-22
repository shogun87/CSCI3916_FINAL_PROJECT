import mongoose from 'mongoose'
const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name of country is required'
    }, 
    allowPurchase: {
        type: Boolean,
        default: true
    }
});