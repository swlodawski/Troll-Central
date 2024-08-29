const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/', apiRoutes);

router.use((req, res) => {
    console.log('Wrong Route!!!');
});

module.exports = router;