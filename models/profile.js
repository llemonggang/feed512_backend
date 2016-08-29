const mongoose = require('mongoose');

var profileSchema = {
  fullName: String,
  businessType: String,
  address: String,
  phone: Number,
  email: String,
  userId: Number
}

const Profile = mongoose.model('Profile', userSchema);

module.exports = Profile;
