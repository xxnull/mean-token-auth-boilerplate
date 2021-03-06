var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Publisher = require('../models/Publisher.js');
var authCheck = require('../includes/auth.js');

/* GET /publisher listing. */
router.get('/', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.publishers.read) {
		res.json({ user_access: false });
		return;
	}
	
	Publisher.find(function (e, publishers) {
		if(e) return next(e);
		res.json(publishers);
	});
	
});

/* GET /publisher/username */
router.get('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.publishers.read) {
		res.json({ user_access: false });
		return;
	}

	Publisher.findById(req.params.id, function (e, post) {
		if(e) return next(e);
		res.json(post);
	});
	
});

/* POST /publisher */
router.post('/', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.publishers.create) {
		res.json({ user_access: false });
		return;
	}
	
	Publisher.create(req.body, function (e, post) {
		if(e) return next(e);
		res.json(post);
	});
	
});

/* PUT /publisher/:id */
router.put('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.publishers.update) {
		res.json({ user_access: false });
		return;
	}
	
	Publisher.findByIdAndUpdate(req.params.id, req.body, function (e, post) {
		if(e) return next(e);
		res.json(post);
	});

});

/* DELETE /publisher/:id */
router.delete('/:id', authCheck.ensure, function(req, res, next) {
	
	if(!req.user.role.access.publishers.delete) {
		res.json({ user_access: false });
		return;
	}

	Publisher.findByIdAndRemove(req.params.id, req.body, function(e, post) {
		if(e) return next(e);
		res.json(post);
	});
  
});

module.exports = router;