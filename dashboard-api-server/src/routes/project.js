const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
const {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers');

const router = Router();

router.post('/list', routeHandler(fetchProjects));
router.post('/create', routeHandler(createProject));
router.post('/update', routeHandler(updateProject));
router.post('/delete', routeHandler(deleteProject));

module.exports = router;
