const express = require("express");

const router = express.Router();

const {
    createUser,
    getUser,
} = require("../controllers/userController");



router.route('/register').post(createUser)
router.route('/get/:id').get(getUser)


module.exports = router;
