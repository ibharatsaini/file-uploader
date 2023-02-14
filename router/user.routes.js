const { myDetails, updateFiles, logoutUser } = require("../controllers/user.controller")
const authenticateUser = require("../middleware/authenticateUser")

const router = require("express").Router()

router.route(`/me`)
        .get(
            [
                authenticateUser
            ],
            myDetails
        )

router.route(`/update-files`)
            .post(
                [
                    authenticateUser,
                ],
                updateFiles
            )

router.route(`/logout`)
            .get(
                [
                    authenticateUser
                ],
                logoutUser
            )

module.exports = router