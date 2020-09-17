const express = require('express');
const router = express.Router();

// @route   GET api/posts/test
// @desc    test posts route
// @access  public
router.get('/test', function(req, res){
    res.status(200).json({
        'msg' : 'posts works'
    });
});

module.exports = router;