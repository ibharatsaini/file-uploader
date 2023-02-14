const { uploadPresignedUrl, downloadPresignedUrl } = require("../controllers/amazon.controller")
const authenticateUser = require("../middleware/authenticateUser")


const router = require("express").Router()


router.route("/upload-url")
            .get(
                [
                    authenticateUser
                ],
                uploadPresignedUrl
            )

router.route("/download-url")
            .get(
                [
                    authenticateUser
                ],
                downloadPresignedUrl
            )


module.exports = router