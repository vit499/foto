const {Router} = require('express')

const router = Router();

router.post('/upload', async (req, res) => {
    try {
        
        console.log('upload foto');
        console.log(req.files)
        console.log(req.body);
        //console.log(req);
    
        res.end('1111')
      }
      catch (e) {
        res.status(500).end('error')
      }
})

module.exports = router
