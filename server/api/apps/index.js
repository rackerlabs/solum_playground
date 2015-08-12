'use strict';

var express = require('express');
var controller = require('./apps.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/status', auth.isAuthenticated(), controller.status);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/create', auth.isAuthenticated(), controller.create);
router.post('/deploy', auth.isAuthenticated(), controller.deploy);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;