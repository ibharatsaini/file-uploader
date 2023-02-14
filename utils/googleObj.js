
const {google} = require("googleapis")

function googleOAuth() {
    const oauth =  new google.auth.OAuth2(
                                    process.env.CLIENT_ID ,
                                    process.env.CLIENT_SECRET ,
                                    process.env.GOOGLE_REDIRECT_URL 
                                )
    
    return oauth

    }


module.exports = googleOAuth