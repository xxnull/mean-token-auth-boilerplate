var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Role = require('../models/Role.js');
var authCheck = require('../includes/auth.js');

/* GET /roles listing. */
router.get('/', authCheck.ensure, function(req, res, next) {
	
	Role
		.find()
		.exec(function(e, roles) {
			if(e) return next(e);
			res.json(roles);
		});
	
});

/* GET /roles/id */
router.get('/:id', authCheck.ensure, function(req, res, next) {
	
	Role.findById(req.params.id, function (e, role) {
		if(e) return next(e);
		res.json(role);
	});
	
});

/* POST /roles */
router.post('/', authCheck.ensure, function(req, res, next) {
	
	Role.create(req.body, function (e, role) {
		if(e) return next(e);
		res.json(role);
	});
	
});

/* PUT /roles/:id */
router.put('/:id', authCheck.ensure, function(req, res, next) {
	
	Role.findByIdAndUpdate(req.params.id, req.body, function (e, role) {
		if(e) return next(e);
		res.json(role);
	});

});

/* DELETE /roles/:id */
router.delete('/:id', authCheck.ensure, function(req, res, next) {
	
	Role.findByIdAndRemove(req.params.id, req.body, function(e, post) {
		if(e) return next(e);
		res.json(post);
	});
  
});

module.exports = router;