var mongoose = require('mongoose');
var ActivitySchema = new mongoose.Schema({
  name: String,
  title: String,
  type: String,
  distance: String,
  upvotes: {type: Number, default: 0},
});

ActivitySchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Activity', ActivitySchema);
