const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
const { fetchStats } = require('../controllers');

const router = Router();

router.post('/project', routeHandler(fetchStats));

module.exports = router;
