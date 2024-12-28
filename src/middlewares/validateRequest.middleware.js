import { body, validationResult } from "express-validator";

const validationRequest = async(req, res, next) => {
    // Set Rules
    const rules = setRules(req);

    // Run the rules
    await Promise.all(rules.map(rule => rule.run(req)));
    let validationErrors = validationResult(req);

    // Check for any validation error
    if(!validationErrors.isEmpty()){
        const toRet = {success: false, response: validationErrors.array()};
        return res.status(400).send(toRet);
    }
    next();
}

function setRules(req){
    if(req.url === '/register'){
        return [
            body('name').isLength({min: 3}).withMessage(errorMessage.name),
            body('email').isEmail().withMessage(errorMessage.email),
            body('password').isLength({min: 3}).withMessage(errorMessage.password)
        ]
    } else if(req.url === '/login'){
        return [
            body('email').isEmail().withMessage(errorMessage.email),
            body('password').isLength({min: 3}).withMessage(errorMessage.password)
        ]
    } else {
        return [
            body('name').isLength({min: 3}).withMessage(errorMessage.name),
            body('email').isEmail().withMessage(errorMessage.email),
            body('contact').isMobilePhone().withMessage(errorMessage.contact)
        ]
    }
}

const errorMessage = {
    name: 'Name is required and should be more than 3 characters',
    email: 'Provide a valid email',
    password: 'Password should contain atleast 3 characters',
    contact: 'Invalid mobile phone number'
}

export default validationRequest;