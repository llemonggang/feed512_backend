const mongoose = require('mongoose');

var donationSchema = {
  foodName: String,
  type: String,
  userId: Number,
  donationId: Number
}

const donation = mongoose.model('donation', donationSchema);

module.exports = Donation;
