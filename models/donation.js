const mongoose = require('mongoose');

var donationSchema = {
  type: String,
  donorId: String,
  recipientId: String
}

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
