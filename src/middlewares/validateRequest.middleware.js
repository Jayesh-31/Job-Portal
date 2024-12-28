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
            body('name').isLength({min: 3}).withMessage('Name ' + errorMessage.name),
            body('email').notEmpty().withMessage(errorMessage.email),
            body('password').isLength({min: 3}).withMessage(errorMessage.password)
        ]
    } else if(req.url === '/login'){
        return [
            body('email').notEmpty().withMessage(errorMessage.email),
            body('password').isLength({min: 3}).withMessage(errorMessage.password)
        ]
    } else if(req.url === '/job'){
        return [
            body('companyName').isLength({min: 3}).withMessage('CompanyName' + errorMessage.name),
            body('role').notEmpty().withMessage(errorMessage.emptyFields + ' Role'),
            body('location').notEmpty().withMessage(errorMessage.emptyFields + ' Location'),
            body('skills').notEmpty().withMessage(errorMessage.emptyFields + ' Skills')
        ]
    } else {
        return [
            body('name').isLength({min: 3}).withMessage('Name' + errorMessage.name),
            body('email').isEmail().withMessage(errorMessage.email),
            body('contact').isMobilePhone().withMessage(errorMessage.contact)
        ]
    }
}

const errorMessage = {
    name: 'is required and should be more than 3 characters',
    email: 'Provide a valid email',
    password: 'Password should contain atleast 3 characters',
    contact: 'Invalid mobile phone number',
    emptyFields: 'Kindly provide value for'
}

export default validationRequest;