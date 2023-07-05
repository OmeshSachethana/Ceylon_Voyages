const express = require('express')
const router = express.Router()
const notificationsController = require('../controllers/notificationsController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/').get(notificationsController.getAllNotifications)

router.route('/').post(notificationsController.createNewNotification)

router.route('/').patch(notificationsController.updateNotification)
router.route('/').delete(notificationsController.deleteNotificaiton)

module.exports = router
