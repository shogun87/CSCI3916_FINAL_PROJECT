import express from 'express'
import countryCtrl from '../controllers/country.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/country')
  .get(/*authCtrl.requireSignin, authCtrl.hasAuthorization,*/ countryCtrl.read)
router.route('/api/country/:countryName')
  .put(/*authCtrl.requireSignin, authCtrl.hasAuthorization,*/ countryCtrl.update)

router.param('countryName', countryCtrl.countryByName)

export default router
