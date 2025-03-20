const joi = require('joi')

const registerValidation = (data) => { // Check for formatting for a registration
    const schemaValidation = joi.object({
        username:joi.string().required().min(3).max(256),
        email:joi.string().required().min(3).max(256).email(),
        password:joi.string().required().min(3).max(1024)
    })
    return schemaValidation.validate(data)
}

const loginValidation = (data) => { // Check for formatting for a login
    const schemaValidation = joi.object({
        email:joi.string().required().min(3).max(256).email(),
        password:joi.string().required().min(3).max(1024)
    })
    return schemaValidation.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation