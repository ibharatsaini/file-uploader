const { getUrl , googleLogin} = require("../controllers/google.controller")

const router = require("express").Router()


router.route(`/get-url`)
            .get(
                getUrl
            )

router.route(`/login`)
                .get(
                    googleLogin
                )


module.exports = router