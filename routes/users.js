const router = require('express').Router();
const { getUserInfo, updateUserProfile } = require('../controllers/users');
const { updateUserProfileValidate } = require('../middlewares/preValidate');

router.get('/me', getUserInfo);
router.patch('/me', updateUserProfileValidate, updateUserProfile);

module.exports = router;
