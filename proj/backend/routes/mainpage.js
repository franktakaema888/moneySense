//where to call the main page before login 

const router = require('express').Router();
const { register, login } = require('../Function/login');

router.get('/',(req, res)=>{
    res.send("hello login page")
})

//login page
router.post('/register', register)
      .post('/login', login)

module.exports = router