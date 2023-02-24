const { uploadPresignedUrl, uploadParts, downloadPresignedUrl, uploadFull } = require("../controllers/amazon.controller")

const authenticateUser = require("../middleware/authenticateUser")

const router = require("express").Router()



router.route("/upload-url")
            .post(
                [
                    authenticateUser,
                ],
                uploadPresignedUrl
            )

router.route(`/upload-chunk`)
            .post(
                [
                    authenticateUser,
                ],
                uploadParts
            )

router.route(`/upload-full`)
            .post(
                [
                    authenticateUser,
                ],
                uploadFull
            )

router.route("/download-url")
            .get(
                [
                    authenticateUser
                ],
                downloadPresignedUrl
            )


module.exports = router