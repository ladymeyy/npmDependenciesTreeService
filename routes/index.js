var express = require('express');
var {getNpmPackageDeps} = require('../services/npmPackageDepsService');
var router = express.Router();

router.get('/', function(req, res, next) {
  return res.status(200);
});

router.get('/package/:packagename/:version', async (req, res, next) => {
  const { packagename, version } = req.params;
  try {
    const result = await getNpmPackageDeps(packagename, version);
    return res.status(200).json(result);

  } catch (error) {
    return next(error);
  }
});

module.exports = router;
