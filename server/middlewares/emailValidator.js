//Middeware to validate email
const validateEmail = (req,res,next) => {
    const email = req.body.email 
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if(emailPattern.test(email)) {
        next()
    }else {
        res.status(400).json({error : 'Invalid email address'})
    }
}

module.exports = validateEmail ;