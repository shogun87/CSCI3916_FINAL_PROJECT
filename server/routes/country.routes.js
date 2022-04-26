import express from 'express'
import countryCtrl from '../controllers/country.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/country')
  .get(authCtrl.requireSignin, userCtrl.isAdmin, countryCtrl.read)
router.route('/api/country/:countryName')
  .put(authCtrl.requireSignin, userCtrl.isAdmin, countryCtrl.update)
router.route('/api/country/search')
  .get(authCtrl.requireSignin, userCtrl.isAdmin, countryCtrl.search)

router.param('countryName', countryCtrl.countryByName)

export default router
