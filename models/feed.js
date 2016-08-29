const mongoose = require('mongoose');

var userSchema = {
  fullName: String,
  businessType: String,
  address: String,
  phone: Number,
  email: String,
  userId: Number
}

var donationSchema = {
  foodName: String,
  type: String,
  userId: Number,
  donationId: Number
}

const Feed = mongoose.model('Feed', userSchema);

const donation = mongoose.model('donation', donationSchema);

module.exports = Feed;
