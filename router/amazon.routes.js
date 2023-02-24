const { uploadPresignedUrl,uploadParts, downloadPresignedUrl, uploadFull } = require("../controllers/amazon.controller")
const authenticateUser = require("../middleware/authenticateUser")

const router = require("express").Router()

const multer = require("multer")

const upload  = multer()

router.route("/upload-url")
            .post(
                [
                    authenticateUser,
                    // upload.single('file')
                ],
                uploadPresignedUrl
            )

router.route(`/upload-chunk`)
            .post(
                [
                    authenticateUser,
                    upload.any()
                ],
                uploadParts
            )

router.route(`/upload-full`)
            .post(
                [
                    authenticateUser,
                    upload.any(),
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