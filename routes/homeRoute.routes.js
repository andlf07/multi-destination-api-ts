const { Router } = require('express');

const router = Router();


router.get('/welcome', ( req, res ) => {
   res.json({
      hi: "Welcome to multi-destinaion-api"
   });
});


module.exports = router;