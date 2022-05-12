const express = require('express');
const router = express.Router();
const User = require('../modules/Users')
const { body, validationResult } = require('express-validator');
// const { findOne } = require('../modules/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

//ROUTE 1:create a user using :post "/api/auth/createuser" : login not required  and stored at mongodb server 
router.post("/createuser", [
  body('name', "enter a valid name ").isLength({ min: 3 }),
  body('email', "enter a valid email").isEmail(),
  body('password', "enter a valid password ").isLength({ min: 5 }),
], async (req, res) => {
  // if there error occurs return the bad request 
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check whether user already exist with this email
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ errors: "sorry  user is exist with this email" });
  }
  try {
    // password hashing 
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //creating the user 
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    //jwt json web token used for signature signin
    let data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, 'secret');
    let name = user.name
    success = true;
    console.log(success, authtoken);
    res.json({ success, name, authtoken })

    // res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('some error ocured ')

  }


},

);
// ROUTE 2: authenticate required to login :post "/api/auth/login"  
router.post("/login", [
  // body('name', "enter a valid name ").isLength({ min: 3 }),
  body('email', "enter a valid email").isEmail(),
  body('password', "enter a valid password ").isLength({ min: 5 }),
], async (req, res) => {
  // if there error occurs return the bad request 
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check whether user already exist with this email
  const email = req.body.email;
  const password = req.body.password
  try {

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ errors: "sorry  user is exist with this email" });
    }

    const passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      success = false;
      return res.status(400).json({ success, errors: "sorry  enter a valid password" });
    }
    console.log('password match');

    let data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, 'secret');
    let name = user.name
    success = true
    console.log(success, name, authtoken);
    res.json({ success, name, authtoken })

    // res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('some error ocured ')

  }


},

);

// ROUTE 3: fetching the user data using token :post "/api/auth/getuser":login required 
router.post("/getuser", fetchuser, async (req, res) => {
  const userid = req.user.id;
  try {
    const user = await User.findById(userid).select('-password');
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('some error ocured ')

  }

  // console.log('user authenticated ')


});


module.exports = router;