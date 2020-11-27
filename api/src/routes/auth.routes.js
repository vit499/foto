const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const router = Router()

router.post('/register', async (req, res) => {
  try {
    //const {login, password} = req.body
    const loginIn = req.body.login
    const passwordIn = req.body.password
    console.log('register', loginIn, passwordIn);

    if(!loginIn || loginIn === '') {
      return res.status(400).json({message: 'login empty'})
    } 
    if(!passwordIn || passwordIn === '') {
      return res.status(400).json({message: 'password empty'})
    }
    const login = loginIn.trim()
    const password = passwordIn.trim()

    const isUser = await User.findOne({login})
    if(isUser) {
      return res.status(400).json({message: 'user exist'})
    }
    const hash = await bcrypt.hash(password, 12)
    const user = new User({login: login, password: hash})
    await user.save()

    res.status(201).json({message: 'user created'})
  }
  catch (e) {
    res.status(500).json({message: 'something wrong'})
  }
})

router.post('/login', async (req, res) => {
  try {
    //const {login, password} = req.body
    const loginIn = req.body.login
    const passwordIn = req.body.password
    console.log('register', loginIn, passwordIn);

    if(!loginIn || loginIn === '') {
      return res.status(400).json({message: 'login empty'})
    } 
    if(!passwordIn || passwordIn === '') {
      return res.status(400).json({message: 'password empty'})
    }
    const login = loginIn.trim()
    const password = passwordIn.trim()
    
    const user = await User.findOne({login})
    if(!user) { 
      return res.status(400).json({message: 'user dont exist'})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(400).json({message: 'pass wrong'})
    }
    const token = jwt.sign(
      {userId: user.id},
      'secret',
      {expiresIn: '1h'}
    );
    res.json({token: token, userid: user.id})
  }
  catch (e) {
    res.status(500).json({message: 'something wrong'})
  }
})

module.exports = router