const mongoose = require('mongoose');

var profileSchema = {
  fullName: String,
  businessType: String,
  address: String,
  phone: String,
  email: String,
  userId: String
}

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
