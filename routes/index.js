var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');

router.get('/activity', function(req, res, next) {
  Activity.find(function(err, activities){
    if(err){ return next(err); }
    res.json(activities);
  });
});

router.post('/activity', function(req, res, next) {
  var activity = new Activity(req.body);
  activity.save(function(err, activity){
    if(err){ return next(err); }
    res.json(activity);
  });
});

router.param('activity', function(req, res, next, id) {
  Activity.findById(id, function (err, activity){
    if (err) { return next(err); }
    if (!activity) { return next(new Error("can't find comment")); }
    req.activity = activity;
    return next();
  });
});

router.get('/activity/:activity', function(req, res) {
  res.json(req.activity);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/activity/:activity/upvote', function(req, res, next) {
  req.activity.upvote(function(err, activity){
    if (err) { return next(err); }
    res.json(activity);
  });
});

router.delete('/activity/:activity', function(req, res) {
  console.log("in Delete");
  req.activity.remove();
  res.sendStatus(200);
});

module.exports = router;

