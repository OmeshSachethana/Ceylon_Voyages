const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/').post(usersController.createNewUser)
router.route('/:id').get(usersController.getSingleUser)
router.route('/').get(usersController.getAllUsers)
router.route('/search/username/:keyword').get(usersController.getSingleUserByUserName)
router.route('/search/firstname/:keyword').get(usersController.getSingleUserByFirstName)

router.use(verifyJWT)

router.route('/')
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)


module.exports = router
