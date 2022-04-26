import Country from '../models/country.model'
import errorHandler from './../helpers/dbErrorHandler'

/**
 * Load country and append to req.
 */
 const countryByName = async (req, res, next, name) => {
  try {
    let country = await Country.findOne({ name: name })
    if (!country)
      return res.status('400').json({
        error: "Country not found"
      })
    req.profile = country
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve country"
    })
  }
}

const read = async (req, res) => {
  try {
    let countries = await Country.find({})
    res.json({ countries: countries })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let country = req.profile
    country.allowPurchase = req.body.allowPurchase
    await country.save()
    res.json(country)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const search = async (req, res) => {
  let query = {}
  if (req.query.search !== '') {
    query = { name: {'$regex': req.query.search, '$options': "i"} }
  }
  try {
    let countries = await Country.find(query)
    res.json({ countries: countries })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }  
}

export default {
  countryByName,
  read,
  update,
  search
}