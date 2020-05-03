const { Router } = require('express');

const router = new Router({ mergeParams: true });

// Get the sources
router.get('/', (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
});

module.exports = router;
