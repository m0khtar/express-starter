module.exports = {
	index: function(req, res, next) {
		res.locals.user = req.user;
		res.render('index');
	}
};