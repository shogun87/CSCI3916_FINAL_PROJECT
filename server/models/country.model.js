import mongoose from 'mongoose'
const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name of country is required',
        unique: 'Country names must be unique.'
    }, 
    code: {
        type: String,
        required: 'Name of country is required'
    }, 
    allowPurchase: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Country', CountrySchema)