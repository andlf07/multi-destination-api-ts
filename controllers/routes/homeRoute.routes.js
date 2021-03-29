const { Router } = require('express');

const router = Router();


router.get('/welcome', ( req, res ) => {
   res.json({
      hi: "Wlcome to multi-destinaion-api"
   });
});


module.exports = router;